class HomeController < ApplicationController
  # Skip authentication for the home page - everyone can see places
  skip_before_action :authenticate_user_if_needed!, only: [:index]
  
  def index
    # Get all places for the map
    places = Place.includes(:user).all
    
    # Debug places count
    Rails.logger.info "HomeController#index - Found #{places} places in database"
    
    # Build places array - keep it simple for debugging
    places_array = places.map do |place|
      {
        id: place.id,
        name: place.name,
        description: place.description,
        latitude: place.latitude.to_s,
        longitude: place.longitude.to_s,
        created_by: {
          name: place.user.email,
          id: place.user.id
        }
      }
    end
    
    Rails.logger.info "HomeController#index - Places count: #{places_array.size}"
    
    # Instead of creating a new props hash, update the @inertia props directly
    @inertia = {
      component: 'Home',
      props: {
        greeting: "Find and Share Locations Around the World",
        description: "Explore interesting places or add your own locations to the map",
        places: places_array
      }
    }
    
    # Log the props keys
    Rails.logger.info "HomeController#index - Props keys: #{@inertia[:props].keys.join(', ')}"
    
    # Use the standard render inertia method which will use the @inertia variable
    render inertia: @inertia[:component], props: @inertia[:props]
  end
  
  def protected
    render inertia: "Protected"
  end
end 