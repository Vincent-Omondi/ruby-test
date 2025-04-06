class SettingsController < ApplicationController
  before_action :authenticate_user!
  
  def index
    render inertia: 'settings/Index', props: {
      user: {
        email: current_user.email,
        id: current_user.id
      },
      settings: {
        notifications: true,
        privacy: 'public',
        theme: 'light'
      },
      csrf_token: form_authenticity_token
    }
  end
end 