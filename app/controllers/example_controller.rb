class ExampleController < ApplicationController
  def index
    render inertia: 'Example'
  end
end 