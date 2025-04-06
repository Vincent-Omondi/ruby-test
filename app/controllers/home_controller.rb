class HomeController < ApplicationController
  skip_before_action :authenticate_user_if_needed!, only: [:index]
  
  def index
    # Build the props directly with authentication data
    props = {
      greeting: "Welcome to Test Project",
      description: "Find and share locations around the world",
      auth: user_signed_in? ? {
        user: {
          id: current_user.id,
          email: current_user.email,
          admin: current_user.respond_to?(:has_role?) ? current_user.has_role?(:admin) : false
        }
      } : { user: nil }
    }
    
    # Directly render the component
    render inertia: 'Home', props: props
  end
  
  def protected
    render inertia: "Protected"
  end
end 