class Users::SessionsController < Devise::SessionsController
  respond_to :html, :json
  before_action :configure_sign_in_params, only: [:create]
  
  # GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
    
    # Use a simple direct render approach with consistent component name
    render inertia: "auth/Login", props: {
      csrf_token: form_authenticity_token,
      resource: resource,
      resource_name: resource_name,
      errors: flash[:alert] ? [flash[:alert]] : []
    }
  end

  # POST /resource/sign_in
  def create
    begin
      # Log the received parameters for debugging
      Rails.logger.info "Login Parameters: #{params.inspect}"
      
      # Extract parameters from any of the possible sources
      email = params[:email] || params.dig(:user, :email) || params.dig(:session, :email)
      password = params[:password] || params.dig(:user, :password) || params.dig(:session, :password)
      remember_me = params[:remember_me] || params.dig(:user, :remember_me) || params.dig(:session, :remember)
      
      if email.blank? || password.blank?
        raise StandardError, "Email or password missing"
      end
      
      # Manually set the parameters for Warden
      request.params[:user] = { email: email, password: password, remember_me: remember_me }
      
      self.resource = warden.authenticate!(auth_options)
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      
      redirect_to after_sign_in_path_for(resource)
    rescue => e
      # Handle authentication failure
      Rails.logger.error "Authentication error: #{e.message}"
      self.resource = resource_class.new(email: params[:email] || params.dig(:user, :email) || params.dig(:session, :email))
      clean_up_passwords(resource)
      
      render inertia: 'auth/Login', props: {
        csrf_token: form_authenticity_token,
        resource: resource,
        resource_name: resource_name,
        errors: ["Invalid email or password."]
      }, status: :unauthorized
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