InertiaRails.configure do |config|
  config.version = "1.0"
  config.layout = 'inertia'
  
  # Add ability to detect request types
  ActionDispatch::Request.class_eval do
    def inertia?
      key?('x-inertia') || headers['x-inertia'].present?
    end
  end
  
  # Set SSR disabled
  config.ssr_enabled = false
end

# Add a render monkey patch to diagnose issues
module InertiaRenderEnhancer
  def inertia_render(options)
    Rails.logger.info "Inertia render called with: #{options.inspect}"
    component = options[:component] || options[:page] || "Error"
    props = options[:props] || {}
    
    # Always ensure these basic props are set
    props[:component_name] = component
    
    # Call the original method
    render inertia: component, props: props
  end
  
  def render(*args)
    options = args.first
    
    # Intercept inertia render calls
    if options.is_a?(Hash) && options[:inertia].present?
      component_name = options[:inertia]
      original_props = options[:props] || {}
      
      # Special handling for Devise routes - normalize component names
      if request.path.include?('/users/sign_in')
        component_name = 'auth/Login'
      elsif request.path.include?('/users/sign_up') 
        component_name = 'auth/Register'
      end
      
      # Create a new props hash that preserves original props
      props = original_props.dup
      
      # Ensure auth data is always included
      if user_signed_in? && !props[:auth]
        props[:auth] = {
          user: {
            id: current_user.id,
            email: current_user.email,
            admin: current_user.respond_to?(:has_role?) ? current_user.has_role?(:admin) : false
          }
        }
      elsif !props[:auth]
        props[:auth] = { user: nil }
      end
      
      Rails.logger.info "Enhanced inertia render: #{component_name} with props: #{props.keys}"
      Rails.logger.info "Original props: #{original_props.keys}"
      
      # Override the inertia component name and props
      args.first[:inertia] = component_name
      args.first[:props] = props
      
      # Continue with the original render
      super
    else
      super
    end
  end
end

# Use Rails.application.config.to_prepare to ensure ApplicationController is loaded first
Rails.application.config.to_prepare do
  ApplicationController.include(InertiaRenderEnhancer) if defined?(ApplicationController)
end
