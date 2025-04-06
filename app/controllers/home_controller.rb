class HomeController < ApplicationController
  skip_before_action :authenticate_user_if_needed!, only: [:index]
  
  def index
    props = {
      greeting: "Welcome to Test Project",
      description: "Find and share locations around the world",
      # Adding any current_user info that might be needed by the layout
      auth: user_signed_in? ? {
        user: {
          id: current_user.id,
          email: current_user.email,
          admin: current_user.respond_to?(:has_role?) ? current_user.has_role?(:admin) : false
        }
      } : { user: nil }
    }
    
    # Set the page explicitly using inertia_render
    inertia_render(
      component: 'Home',
      props: props
    )
  end
  
  def protected
    render inertia: "Protected", url: request.original_url
  end
end 