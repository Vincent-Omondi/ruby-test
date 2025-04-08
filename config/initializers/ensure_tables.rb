Rails.application.config.after_initialize do
  begin
    # Only run this in production
    if Rails.env.production?
      conn = ActiveRecord::Base.connection
      
      # First check if users table exists, create it if not
      unless conn.table_exists?(:users)
        Rails.logger.warn "Users table does not exist, creating it..."
        
        conn.create_table :users do |t|
          t.string :email, null: false, default: ""
          t.string :encrypted_password, null: false, default: ""
          t.string :reset_password_token
          t.datetime :reset_password_sent_at
          t.datetime :remember_created_at
          t.timestamps null: false
        end
        
        conn.add_index :users, :email, unique: true
        conn.add_index :users, :reset_password_token, unique: true
        
        Rails.logger.info "Users table created successfully"
      end
      
      # Now check for roles table
      unless conn.table_exists?(:roles)
        Rails.logger.warn "Roles table does not exist, creating it..."
        
        conn.create_table :roles do |t|
          t.string :name
          t.string :resource_type
          t.bigint :resource_id
          t.timestamps null: false
        end
        
        conn.add_index :roles, :name
        conn.add_index :roles, [:resource_type, :resource_id], name: "index_roles_on_resource"
        conn.add_index :roles, [:name, :resource_type, :resource_id], name: "index_roles_on_name_and_resource_type_and_resource_id"
        
        Rails.logger.info "Roles table created successfully"
      end
      
      # Now check for users_roles table
      unless conn.table_exists?(:users_roles)
        Rails.logger.warn "Users_roles table does not exist, creating it..."
        
        conn.create_table :users_roles, id: false do |t|
          t.references :user
          t.references :role
        end
        
        conn.add_index :users_roles, [:user_id, :role_id], name: "index_users_roles_on_user_id_and_role_id"
        
        Rails.logger.info "Users_roles table created successfully"
      end
      
      # Finally check for places table
      unless conn.table_exists?(:places)
        Rails.logger.warn "Places table does not exist, creating it..."
        
        conn.create_table :places do |t|
          t.string :name
          t.text :description
          t.decimal :latitude
          t.decimal :longitude
          t.references :user, null: false
          t.timestamps null: false
        end
        
        # Add foreign key separately to avoid issues if the table exists without it
        if conn.table_exists?(:users)
          begin
            conn.add_foreign_key :places, :users
            Rails.logger.info "Added foreign key to places table"
          rescue => e
            Rails.logger.error "Error adding foreign key to places: #{e.message}"
          end
        end
        
        Rails.logger.info "Places table created successfully"
      end
      
      # Also ensure locations table exists
      unless conn.table_exists?(:locations)
        Rails.logger.warn "Locations table does not exist, creating it..."
        
        conn.create_table :locations do |t|
          t.string :name
          t.float :latitude
          t.float :longitude
          t.references :user, null: false
          t.timestamps null: false
        end
        
        # Add foreign key separately
        if conn.table_exists?(:users)
          begin
            conn.add_foreign_key :locations, :users
            Rails.logger.info "Added foreign key to locations table"
          rescue => e
            Rails.logger.error "Error adding foreign key to locations: #{e.message}"
          end
        end
        
        Rails.logger.info "Locations table created successfully"
      end
      
      # Log summary of tables
      Rails.logger.info "Database tables: #{conn.tables.join(', ')}"
    end
  rescue => e
    Rails.logger.error "Error ensuring tables: #{e.message}"
    Rails.logger.error e.backtrace.join("\n")
  end
end 