module Admin
  class UsersController < ApplicationController
    before_action :authenticate_user!
    before_action :authorize_admin
    
    def index
      @users = User.all
      render inertia: 'Admin/Users/Index', props: {
        users: @users.as_json(include: :roles, methods: :role_names)
      }
    end
    
    def destroy
      @user = User.find(params[:id])
      if @user.id != current_user.id
        @user.destroy
        redirect_to admin_users_path, notice: 'User was successfully deleted.'
      else
        redirect_to admin_users_path, alert: 'You cannot delete yourself.'
      end
    end
    
    private
    
    def authorize_admin
      authorize User, :admin?
    end
  end
end 