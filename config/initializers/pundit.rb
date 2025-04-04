# Extends the ApplicationController to add Pundit for authorization.
# The application controller is the common ancestor of all controllers in the application.
# This adds behavior that all controllers can use.
Rails.application.config.to_prepare do
  ApplicationController.include Pundit::Authorization
end 