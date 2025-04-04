class LocationPolicy < ApplicationPolicy
  def index?
    true # Everyone can see the list of locations
  end

  def show?
    true # Everyone can view location details
  end

  def create?
    user.present? # Only logged in users can create
  end

  def update?
    return false unless user.present?
    user.has_role?(:admin) || record.user == user # Only admin or owner can update
  end

  def destroy?
    return false unless user.present?
    user.has_role?(:admin) || record.user == user # Only admin or owner can delete
  end

  class Scope < Scope
    def resolve
      scope.all # By default show all locations
    end
  end
end 