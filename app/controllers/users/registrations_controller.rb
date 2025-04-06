class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :html, :json
  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update_params, only: [:update]
  
  # GET /resource/sign_up
  def new
    build_resource
    yield resource if block_given?
    
    begin
      response = {
        component: "auth/Register",  # Explicitly set the exact component name to match the file path
        props: {
          csrf_token: form_authenticity_token,
          resource: resource,
          resource_name: resource_name
        },
        url: request.original_url
      }
      
      # Pass the exact component data directly
      @inertia = response
      render inertia: response[:component], props: response[:props], url: response[:url]
    rescue => e
      Rails.logger.error "Error rendering Register page: #{e.message}\n#{e.backtrace.join("\n")}"
      render inertia: 'Error', props: {
        status: 500,
        message: "Error loading registration page: #{e.message}"
      }, status: 500
    end
  end

  # POST /resource
  def create
    # Log the received parameters to help with debugging
    Rails.logger.info "Registration Parameters: #{params.inspect}"
    
    # Extract the parameters depending on how they're submitted
    sign_up_params = if params[:user]
                       params.require(:user).permit(:email, :password, :password_confirmation)
                     elsif params[:registration]
                       params.require(:registration).permit(:email, :password, :password_confirmation)
                     else
                       # Handle direct parameters
                       params.permit(:email, :password, :password_confirmation)
                     end
    
    Rails.logger.info "Using sign_up_params: #{sign_up_params.inspect}"
    
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        
        redirect_to after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        
        redirect_to after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      
      Rails.logger.info "Registration failed with errors: #{resource.errors.full_messages}"
      
      render inertia: 'auth/Register', props: {
        csrf_token: form_authenticity_token,
        resource: resource,
        resource_name: resource_name,
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity, url: request.original_url
    end
  end

  # GET /resource/edit
  def edit
    render inertia: 'auth/EditAccount', props: {
      csrf_token: form_authenticity_token,
      resource: resource,
      resource_name: resource_name
    }, url: request.original_url
  end

  # PUT /resource
  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    resource_updated = update_resource(resource, account_update_params)
    yield resource if block_given?
    if resource_updated
      set_flash_message_for_update(resource, prev_unconfirmed_email)
      bypass_sign_in resource, scope: resource_name if sign_in_after_change_password?

      redirect_to after_update_path_for(resource)
    else
      clean_up_passwords resource
      set_minimum_password_length
      
      render inertia: 'auth/EditAccount', props: {
        csrf_token: form_authenticity_token,
        resource: resource,
        resource_name: resource_name,
        errors: resource.errors.full_messages
      }, status: :unprocessable_entity, url: request.original_url
    end
  end

  # DELETE /resource
  def destroy
    resource.destroy
    Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name)
    set_flash_message! :notice, :destroyed
    yield resource if block_given?
    
    redirect_to after_sign_out_path_for(resource_name)
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:email, :password, :password_confirmation])
  end

  def configure_account_update_params
    devise_parameter_sanitizer.permit(:account_update, keys: [:email, :password, :password_confirmation, :current_password])
  end

  def after_sign_up_path_for(resource)
    stored_location_for(resource) || root_path
  end

  def after_update_path_for(resource)
    root_path
  end
end 