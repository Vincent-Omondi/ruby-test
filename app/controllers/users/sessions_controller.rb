class Users::SessionsController < Devise::SessionsController
  respond_to :html
  skip_before_action :authenticate_user!, only: [:new, :create]
  
  # GET /resource/sign_in
  def new
    self.resource = resource_class.new(sign_in_params)
    clean_up_passwords(resource)
    yield resource if block_given?
    
    # Manually prepare the Inertia data structure
    @inertia = {
      component: 'auth/Login',  # Use the full path to the component
      props: {
        auth: { user: nil }  # Include auth props to prevent undefined error
      },
      url: request.original_url,
      version: "1.0"
    }
    
    # Render with the Inertia layout
    render layout: 'inertia'
  end

  # POST /resource/sign_in
  def create
    self.resource = warden.authenticate!(auth_options)
    set_flash_message!(:notice, :signed_in)
    sign_in(resource_name, resource)
    yield resource if block_given?
    
    if request.xhr? || request.inertia?
      render json: {
        data: { redirect_to: after_sign_in_path_for(resource) }
      }, status: :ok
    else
      respond_with resource, location: after_sign_in_path_for(resource)
    end
  end

  # DELETE /resource/sign_out
  def destroy
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    set_flash_message! :notice, :signed_out if signed_out
    yield if block_given?
    
    if request.xhr? || request.inertia?
      render json: {
        data: { redirect_to: after_sign_out_path_for(resource_name) }
      }, status: :ok
    else
      respond_to_on_destroy
    end
  end

  protected

  def after_sign_in_path_for(resource)
    stored_location_for(resource) || root_path
  end

  def after_sign_out_path_for(resource_or_scope)
    root_path
  end
end 