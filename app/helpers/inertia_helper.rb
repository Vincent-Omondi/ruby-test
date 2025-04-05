module InertiaHelper
  def render_inertia_app
    data_page = Inertia::Renderer.new(request, response).to_json
    tag.div id: 'app', data: { page: data_page }
  end
end 