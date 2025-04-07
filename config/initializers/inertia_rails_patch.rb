# Monkey patch for Inertia Rails to fix component name issues
module InertiaRailsPatch
  def self.patch!
    # Get the Inertia::Renderer class if available
    if defined?(Inertia::Renderer)
      Inertia::Renderer.class_eval do
        # Override the render_inertia method to fix component names
        alias_method :original_render_inertia, :render_inertia
        
        def render_inertia
          # Fix component names for auth pages
          if @component.to_s == 'Sign_in'
            Rails.logger.info "InertiaRailsPatch: Fixing component name from Sign_in to auth/Login" 
            @component = 'auth/Login'
          elsif @component.to_s == 'Sign_up'
            Rails.logger.info "InertiaRailsPatch: Fixing component name from Sign_up to auth/Register"
            @component = 'auth/Register'
          end
          
          # Call the original method
          original_render_inertia
        end
      end
    end
  end
end

# Apply the patch after Rails is initialized
Rails.application.config.after_initialize do
  InertiaRailsPatch.patch!
  Rails.logger.info "InertiaRailsPatch loaded to fix component naming issues"
end 