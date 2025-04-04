Rails.application.routes.draw do
  # Remove auto-generated routes
  # get 'locations/index'
  # get 'locations/show'
  # get 'locations/new'
  # get 'locations/create'
  # get 'locations/edit'
  # get 'locations/update'
  # get 'locations/destroy'
  
  # Add RESTful routes
  resources :locations
  
  # Example route to test the new layout
  get 'example', to: 'example#index'
  
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"
  
  # Admin routes
  namespace :admin do
    resources :users, only: [:index, :destroy]
  end
end
