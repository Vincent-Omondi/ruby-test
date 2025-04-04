class HomeController < ApplicationController
  def index
    @locations = Location.includes(:user).all
    render inertia: 'Home/Index', props: {
      locations: @locations.as_json(include: :user)
    }
  end
end 