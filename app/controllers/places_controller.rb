class PlacesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :set_place, only: [:show, :edit, :update, :destroy]
  
  def index
    places = Place.includes(:user).all
    render inertia: 'places/Index', props: {
      places: places.map { |place| place_json(place) }
    }
  end
  
  def show
    render inertia: 'places/Show', props: {
      place: place_json(@place)
    }
  end
  
  def new
    render inertia: 'places/New', props: {
      csrf_token: form_authenticity_token,
      errors: []
    }
  end
  
  def create
    Rails.logger.info "PlacesController#create - Params: #{place_params.inspect}"
    @place = current_user.places.new(place_params)
    
    if @place.save
      Rails.logger.info "PlacesController#create - Place saved successfully: #{@place.attributes}"
      redirect_to root_path, notice: 'Place created successfully'
    else
      Rails.logger.error "PlacesController#create - Failed to save place: #{@place.errors.full_messages}"
      render inertia: 'places/New', props: {
        errors: @place.errors.full_messages || [],
        csrf_token: form_authenticity_token
      }, status: :unprocessable_entity
    end
  end
  
  def edit
    render inertia: 'places/Edit', props: {
      place: place_json(@place),
      csrf_token: form_authenticity_token
    }
  end
  
  def update
    if @place.update(place_params)
      redirect_to places_path, notice: 'Place updated successfully'
    else
      render inertia: 'places/Edit', props: {
        place: place_json(@place),
        errors: @place.errors.full_messages,
        csrf_token: form_authenticity_token
      }, status: :unprocessable_entity
    end
  end
  
  def destroy
    @place = Place.find(params[:id])
    
    # Check if current user is the owner
    if @place.user_id != current_user.id
      return redirect_to root_path, alert: 'You are not authorized to delete this location'
    end
    
    if @place.destroy
      redirect_to root_path, notice: 'Location successfully deleted'
    else
      redirect_to root_path, alert: 'Failed to delete location'
    end
  end
  
  private
  
  def set_place
    @place = Place.find(params[:id])
  end
  
  def place_params
    params.require(:place).permit(:name, :description, :latitude, :longitude)
  end
  
  def place_json(place)
    {
      id: place.id,
      name: place.name,
      description: place.description,
      latitude: place.latitude.to_s,
      longitude: place.longitude.to_s,
      created_at: place.created_at,
      created_by: place.created_by
    }
  end
end 