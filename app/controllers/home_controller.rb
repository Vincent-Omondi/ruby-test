class HomeController < ApplicationController
  def index
    props = {
      greeting: "Welcome to Test Project",
      description: "Find and share locations around the world"
    }
    
    # Set the Inertia JSON response directly
    @inertia_data = {
      component: 'Home',
      props: props,
      url: request.original_url,
      version: ""
    }
    
    # Add debug info to logs
    Rails.logger.info "Rendering Inertia component: #{@inertia_data[:component]}"
    Rails.logger.info "With props: #{props.inspect}"
    
    render layout: 'inertia'
  end
end 