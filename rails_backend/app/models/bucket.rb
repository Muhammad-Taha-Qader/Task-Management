class Bucket < ApplicationRecord
  has_many :tasks, dependent: :destroy

  validates :name, presence: true
  validates :status, inclusion: { in: %w[Empty Pending Completed] }
end
