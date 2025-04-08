namespace :db do
  desc "Reset database - drop, create, migrate, seed"
  task force_reset: :environment do
    puts "Attempting to force reset the database..."
    
    # Force drop all tables
    if ActiveRecord::Base.connection.present?
      ActiveRecord::Base.connection.tables.each do |table|
        next if table == "schema_migrations" || table == "ar_internal_metadata"
        puts "Dropping table: #{table}"
        ActiveRecord::Base.connection.execute("DROP TABLE IF EXISTS #{table} CASCADE")
      end
    end
    
    # Load schema
    puts "Loading schema..."
    Rake::Task["db:schema:load"].invoke
    
    puts "Running migrations..."
    Rake::Task["db:migrate"].invoke
    
    # Get list of tables
    tables = ActiveRecord::Base.connection.tables
    puts "Tables after reset: #{tables.join(', ')}"
    
    puts "Database reset complete!"
  end
end 