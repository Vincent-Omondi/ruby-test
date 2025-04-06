class PlacesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  
  def index
    render inertia: 'places/Index', props: {
      places: [
        {
          id: 1,
          name: 'Tech Hub Coworking Space',
          description: 'A modern workspace for tech professionals with high-speed internet and 24/7 access.',
          latitude: '-1.2921',
          longitude: '36.8219',
          created_by: { name: 'Jane Smith' }
        },
        {
          id: 2,
          name: 'Serene Park Viewpoint',
          description: 'Beautiful park with great views of the city skyline, perfect for outdoor activities.',
          latitude: '-1.2823',
          longitude: '36.8172',
          created_by: { name: 'John Doe' }
        }
      ] # Replace with actual data from database
    }
  end
  
  def show
    render inertia: 'places/Show', props: {
      place: {
        id: params[:id],
        name: 'Sample Place',
        description: 'This is a sample place description.',
        latitude: '-1.2921',
        longitude: '36.8219',
        created_by: { name: 'Jane Smith' }
      } # Replace with actual data from database
    }
  end
  
  def new
    render inertia: 'places/New', props: {
      csrf_token: form_authenticity_token
    }
  end
  
  def create
    # Add place creation logic here
    # For now, just redirect to the places list
    redirect_to places_path, notice: 'Place created successfully'
  end
  
  def edit
    render inertia: 'places/Edit', props: {
      place: {
        id: params[:id],
        name: 'Sample Place',
        description: 'This is a sample place description.',
        latitude: '-1.2921',
        longitude: '36.8219'
      }, # Replace with actual data from database
      csrf_token: form_authenticity_token
    }
  end
  
  def update
    # Add place update logic here
    # For now, just redirect to the places list
    redirect_to places_path, notice: 'Place updated successfully'
  end
  
  def destroy
    # Add place deletion logic here
    # For now, just redirect to the places list
    redirect_to places_path, notice: 'Place deleted successfully'
  end
  
  def my_places
    render inertia: 'places/MyPlaces', props: {
      places: [
        {
          id: 1,
          name: 'My Tech Hub',
          description: 'A personal workspace.',
          latitude: '-1.2921',
          longitude: '36.8219',
          created_at: '2023-01-15'
        },
        {
          id: 2,
          name: 'Favorite Park',
          description: 'My favorite park in the city.',
          latitude: '-1.2823',
          longitude: '36.8172',
          created_at: '2023-02-20'
        }
      ] # Replace with actual data from database filtered by current_user
    }
  end
end 