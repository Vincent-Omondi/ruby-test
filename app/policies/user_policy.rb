class UserPolicy < ApplicationPolicy
  def admin?
    user.present? && user.has_role?(:admin)
  end
  
  class Scope < Scope
    def resolve
      if user.has_role?(:admin)
        scope.all
      else
        scope.none
      end
    end
  end
end 