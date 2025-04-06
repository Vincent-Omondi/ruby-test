Rails.application.routes.draw do
  get 'locations/index'
  get 'locations/show'
  get 'locations/new'
  get 'locations/create'
  get 'locations/edit'
  get 'locations/update'
  get 'locations/destroy'
  
  # Add redirects for common authentication paths
  get '/login', to: redirect('/users/sign_in')
  get '/signup', to: redirect('/users/sign_up')
  
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  # Authenticated user routes
  authenticate :user do
    get 'dashboard', to: 'dashboard#index'
    get 'profile', to: 'profile#show'
    get 'profile/edit', to: 'profile#edit'
    get 'settings', to: 'settings#index'
    
    # Places management for authenticated users
    get 'my-places', to: 'places#my_places'
    resources :places
  end
  
  get 'protected', to: 'home#protected'
  
  # Placeholder routes for menu items
  get 'people', to: 'home#index'
  get 'projects', to: 'home#index'
  get 'places', to: 'home#index'
  get 'ubuntu', to: 'home#index'
  get 'about', to: 'home#index'
  get 'blog', to: 'home#index'
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "home#index"
end
