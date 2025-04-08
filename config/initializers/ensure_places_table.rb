Rails.application.config.after_initialize do
  begin
    # Only run this in production
    if Rails.env.production?
      # Check if the places table exists
      unless ActiveRecord::Base.connection.table_exists?(:places)
        Rails.logger.warn "Places table does not exist, attempting to create it..."
        
        # Create the places table directly
        ActiveRecord::Base.connection.create_table :places do |t|
          t.string :name
          t.text :description
          t.decimal :latitude
          t.decimal :longitude
          t.references :user, null: false, foreign_key: true

          t.timestamps
        end
        
        Rails.logger.info "Places table created successfully"
      end
    end
  rescue => e
    Rails.logger.error "Error ensuring places table: #{e.message}"
  end
end 