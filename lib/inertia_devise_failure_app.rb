class InertiaDeviseFailureApp < Devise::FailureApp
  def respond
    if request.inertia?
      # Return a proper Inertia response for authentication failures
      json_response
    else
      super
    end
  end
  
  def json_response
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = {
      component: 'auth/Login',
      props: {
        csrf_token: warden.request.env["action_dispatch.request_id"],
        resource: {},
        resource_name: scope,
        errors: [i18n_message]
      },
      url: attempted_path || request.path,
      version: "1.0"
    }.to_json
  end
  
  def recall
    config = Rails.application.config
    controller_path = ActiveSupport::Inflector.underscore(controller_name)
    controller_segments = controller_path.split('/')
    
    # Make sure to add the module prefix if any (e.g. users/sessions)
    if controller_segments.size > 1
      controller_name = "#{controller_segments.first.camelize}::#{controller_segments.last.camelize}Controller"
    else
      controller_name = "#{controller_segments.first.camelize}Controller"
    end
    
    recall_controller = controller_name.constantize.new
    recall_controller.request = request
    recall_controller.response = @response
    recall_controller.params = request.params
    
    warden.request.env["devise.mapping"] = Devise.mappings[scope]
    recall_controller.process(recall)
  end
end 