class Task < ApplicationRecord
  belongs_to :bucket

  validates :name, presence: true
  validates :status, inclusion: { in: %w[Pending Completed] }
end
