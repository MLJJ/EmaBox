require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module EmaBox
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    config.i18n.default_locale = :es

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
=begin
    ActionMailer::Base.smtp_settings = {
        :address => 'smtp.gmail.com',
        :domain => 'mail.google.com',
        :port => 587,
        :user_name => 'ema.boxweb@gmail.com',
        :password => '8221053@gmail',
        :authentication => 'login',
        :enable_starttls_auto => true
    }
=end
  end
end
