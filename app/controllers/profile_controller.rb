class ProfileController < ApplicationController
  before_action :authenticate_user!
  
  def show
    inertia_render(
      component: 'profile/Show',
      props: {
        user: {
          id: current_user.id,
          email: current_user.email,
          created_at: current_user.created_at,
          admin: current_user.respond_to?(:has_role?) ? current_user.has_role?(:admin) : false
        }
      }
    )
  end
  
  def edit
    # Will implement later
    redirect_to profile_path, notice: "Profile editing will be available soon"
  end
  
  def update
    if current_user.update(user_params)
      redirect_to profile_path, notice: 'Profile updated successfully'
    else
      render inertia: 'profile/Edit', props: {
        user: {
          email: current_user.email,
          id: current_user.id
        },
        errors: current_user.errors.full_messages,
        csrf_token: form_authenticity_token
      }, status: :unprocessable_entity
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email)
  end
end 