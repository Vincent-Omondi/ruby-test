class EnsurePlacesTable < ActiveRecord::Migration[7.1]
  def up
    unless table_exists?(:places)
      create_table :places do |t|
        t.string :name
        t.text :description
        t.decimal :latitude
        t.decimal :longitude
        t.references :user, null: false, foreign_key: true

        t.timestamps
      end
    end
  end

  def down
    # No need to drop the table here
  end
end 