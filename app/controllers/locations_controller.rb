class LocationsController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :set_location, only: [:show, :edit, :update, :destroy]
  before_action :authorize_location, only: [:edit, :update, :destroy]

  def index
    @locations = Location.all
    render inertia: 'Locations/Index', props: {
      locations: @locations.as_json(include: :user)
    }
  end

  def show
    render inertia: 'Locations/Show', props: {
      location: @location.as_json(include: :user)
    }
  end

  def new
    @location = Location.new
    render inertia: 'Locations/New'
  end

  def create
    @location = current_user.locations.build(location_params)

    if @location.save
      redirect_to locations_path, notice: 'Location was successfully created.'
    else
      render inertia: 'Locations/New', props: {
        location: @location.as_json,
        errors: @location.errors
      }, status: :unprocessable_entity
    end
  end

  def edit
    render inertia: 'Locations/Edit', props: {
      location: @location.as_json
    }
  end

  def update
    if @location.update(location_params)
      redirect_to location_path(@location), notice: 'Location was successfully updated.'
    else
      render inertia: 'Locations/Edit', props: {
        location: @location.as_json,
        errors: @location.errors
      }, status: :unprocessable_entity
    end
  end

  def destroy
    @location.destroy
    redirect_to locations_path, notice: 'Location was successfully deleted.'
  end

  private

  def set_location
    @location = Location.find(params[:id])
  end

  def authorize_location
    authorize @location
  end

  def location_params
    params.require(:location).permit(:name, :latitude, :longitude)
  end
end
