class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json
  before_action :configure_sign_in_params, only: [:create]
  
  # GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
    
    # Use a simpler path format
    begin
      response = {
        component: "auth/Login",  # Explicitly set the exact component name to match the file path
        props: {
          csrf_token: form_authenticity_token,
          resource: resource,
          resource_name: resource_name,
          errors: []
        },
        url: request.original_url
      }
      
      # Pass the exact component data directly
      @inertia = response
      render inertia: response[:component], props: response[:props], url: response[:url]
    rescue => e
      Rails.logger.error "Error rendering Login page: #{e.message}\n#{e.backtrace.join("\n")}"
      render inertia: 'Error', props: {
        status: 500,
        message: "Error loading login page: #{e.message}"
      }, status: 500
    end
  end

  # POST /resource/sign_in
  def create
    begin
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      
      redirect_to after_sign_in_path_for(resource)
    rescue => e
      # Handle authentication failure
      self.resource = resource_class.new(sign_in_params)
      clean_up_passwords(resource)
      
      render inertia: 'auth/Login', props: {
        csrf_token: form_authenticity_token,
        resource: resource,
        resource_name: resource_name,
        errors: ["Invalid email or password."]
      }, status: :unauthorized, url: request.original_url
    end
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    
    redirect_to after_sign_out_path_for(resource_name)
  end

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :password, :remember_me])
  end

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end 