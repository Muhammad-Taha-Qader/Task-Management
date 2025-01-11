Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
   
  namespace :api do
    namespace :v1 do
      resources :buckets do
        resources :tasks, only: [:create, :update, :destroy]
      end
    end
  end
  #resources :buckets
  # GET    /api/v1/buckets          # index action
  # GET    /api/v1/buckets/:id      # show action
  # POST   /api/v1/buckets          # create action
  # PUT    /api/v1/buckets/:id      # update action
  # DELETE /api/v1/buckets/:id      # destroy action
  # resources :tasks under resources :buckets
  # POST   /api/v1/buckets/:bucket_id/tasks         # create a task in a bucket
  # PUT    /api/v1/buckets/:bucket_id/tasks/:id     # update a task in a bucket
  # DELETE /api/v1/buckets/:bucket_id/tasks/:id     # delete a task in a bucket


end
