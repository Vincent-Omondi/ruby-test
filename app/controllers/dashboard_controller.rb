class DashboardController < ApplicationController
  before_action :authenticate_user!
  
  def index
    # Sample stats data - in a real app, this would come from the database
    stats = {
      places_count: 5,  # Example: current_user.places.count,
      total_visits: 125,
      likes: 38
    }
    
    # Recent activity - this would be dynamic in a real app
    recent_activity = [
      { id: 1, type: 'added_place', subject: 'Tech Hub', time: '2 days ago' },
      { id: 2, type: 'received_like', subject: 'Riverside Cafe', time: '1 week ago' },
      { id: 3, type: 'place_visited', subject: 'Downtown Cultural Center', time: '2 weeks ago' }
    ]
    
    inertia_render(
      component: 'dashboard/Index',
      props: {
        user: {
          id: current_user.id,
          email: current_user.email,
          admin: current_user.respond_to?(:has_role?) ? current_user.has_role?(:admin) : false
        },
        stats: stats,
        recent_activity: recent_activity
      }
    )
  end
end 