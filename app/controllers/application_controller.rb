class ApplicationController < ActionController::Base
  include Pundit::Authorization
  
  before_action :authenticate_user!
  
  inertia_share auth: -> {
    if current_user
      {
        user: {
          id: current_user.id,
          email: current_user.email,
          admin: current_user.has_role?(:admin)
        }
      }
    else
      { user: nil }
    end
  }
  
  inertia_share flash: -> {
    {
      success: flash.notice,
      error: flash.alert
    }
  }
  
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
  private
  
  def user_not_authorized
    flash[:alert] = "You are not authorized to perform this action."
    redirect_to(root_path)
  end
  
  protected
  
  def authenticate_user!
    return if devise_controller?
    if !user_signed_in?
      redirect_to new_user_session_path, alert: "You need to sign in before continuing."
    end
  end
end
