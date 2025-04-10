class ApplicationController < ActionController::Base
  include Pundit::Authorization
  
  # Use Devise's authenticate_user! but don't apply it to Devise controllers
  before_action :authenticate_user_if_needed!
  before_action :ensure_inertia_data
  before_action :set_inertia_share
  
  # Handle specific errors rather than all StandardError
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  rescue_from StandardError, with: :handle_standard_error
  
  private
  
  def ensure_inertia_data
    # Ensure we have inertia data defined
    @inertia ||= {}
    
    # Handle the case where path ends with a slash or has no segments
    path_parts = request.path.split('/')
    last_segment = path_parts.reject(&:empty?).last || 'home'
    
    @inertia[:component] ||= last_segment.capitalize
    @inertia[:props] ||= {}
    
    # Only set errors if they don't exist - don't override existing props!
    @inertia[:props][:errors] ||= {}
    
    @inertia[:url] ||= request.original_url
  end
  
  def handle_standard_error(exception)
    Rails.logger.error "Standard error: #{exception.message}\n#{exception.backtrace.join("\n")}"
    
    if request.inertia?
      render inertia: 'Error', props: {
        status: 500,
        message: Rails.env.development? ? exception.message : "Something went wrong"
      }, status: 500
    else
      # For traditional requests, let Rails handle the error
      raise exception
    end
  end
  
  def handle_not_found(exception)
    if request.inertia?
      render inertia: 'Error', props: {
        status: 404,
        message: "Resource not found"
      }, status: 404
    else
      # For traditional requests, let Rails handle the error
      raise exception
    end
  end
  
  def user_not_authorized
    message = "You are not authorized to perform this action."
    if request.inertia?
      render inertia: 'Error', props: {
        status: 403,
        message: message
      }, status: 403
    else
      flash[:alert] = message
      redirect_to(root_path)
    end
  end
  
  protected
  
  # This is called by the before_action
  def authenticate_user_if_needed!
    return if devise_controller?
    
    unless user_signed_in?
      # Never use format.json to avoid Inertia mix-ups
      redirect_to new_user_session_path, alert: "You need to sign in before continuing."
    end
  end

  def set_inertia_share
    # Only set auth data if not already provided by controller
    auth_data = user_signed_in? ? {
      user: {
        id: current_user.id,
        email: current_user.email,
        admin: current_user.respond_to?(:has_role?) ? current_user.has_role?(:admin) : false
      }
    } : { user: nil }
    
    # Log inertia props for debugging
    Rails.logger.info "Before set_inertia_share - Props keys: #{@inertia[:props].keys}" if @inertia && @inertia[:props]
    
    inertia_shared_data do
      {
        auth: auth_data,
        flash: {
          success: flash.notice,
          error: flash.alert
        }
      }
    end
    
    # Log after setting shared data
    Rails.logger.info "After set_inertia_share - Props keys: #{@inertia[:props].keys}" if @inertia && @inertia[:props]
  end
end
