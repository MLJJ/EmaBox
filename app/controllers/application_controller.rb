class ApplicationController < ActionController::Base
  layout "application"
  protect_from_forgery with: :exception
  before_action :configure_devise_params, if: :devise_controller?

  def validation_path_account?(names)
    result = true
    if names =~ /accounts/i
      result = false
    end
    return result
  end
  helper_method :validation_path_account?

  protected
    def configure_devise_params
      devise_parameter_sanitizer.permit(:sign_up) {|account| account.permit(:full_name, :user_name, :email, :password, :password_confirmation, :picture)}
      devise_parameter_sanitizer.permit(:account_update) {|account| account.permit(:full_name, :user_name, :email, :password, :password_confirmation, :current_password, :picture)}
    end
end
