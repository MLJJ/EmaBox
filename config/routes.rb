Rails.application.routes.draw do
  resources :documents
  resources :shared_documents
  root to: 'home#index'
  mount Ckeditor::Engine => '/ckeditor'
  post '/documents/save', to: 'documents#saveDocument'
  resources :conversations, only: [:create] do
    member do
      post :close
    end

    resources :messages, only: [:create]
  end
  devise_for :accounts
end
