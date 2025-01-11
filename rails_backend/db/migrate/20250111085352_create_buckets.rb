class CreateBuckets < ActiveRecord::Migration[7.2]
  def change
    create_table :buckets do |t|
      t.string :name
      t.text :description
      t.string :status

      t.timestamps
    end
  end
end
