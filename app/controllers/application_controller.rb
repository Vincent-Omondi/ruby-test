class ApplicationController < ActionController::Base
  include Pundit::Authorization
  
  inertia_share auth: -> {
    if current_user
      {
        user: {
          id: current_user.id,
          email: current_user.email,
          admin: current_user.has_role?(:admin)
        }
      }
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
end
