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
end

# Use Rails.application.config.to_prepare to ensure ApplicationController is loaded first
Rails.application.config.to_prepare do
  ApplicationController.include(InertiaRenderEnhancer) if defined?(ApplicationController)
end
