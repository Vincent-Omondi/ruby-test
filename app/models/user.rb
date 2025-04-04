class User < ApplicationRecord
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :locations, dependent: :destroy
  
  def role_names
    roles.pluck(:name)
  end
  
  def admin?
    has_role?(:admin)
  end
end
