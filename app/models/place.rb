class Place < ApplicationRecord
  belongs_to :user
  
  validates :name, presence: true
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
  
  def created_by
    { name: user.email, id: user.id }
  end
end
