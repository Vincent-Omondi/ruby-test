#!/bin/bash
# Setup and Run Script for Test Project

echo "==============================================="
echo "      Setting up and Running Test Project      "
echo "==============================================="

echo "==============================================="
echo "         Installing Ruby Dependencies          "
echo "==============================================="

# Check if Ruby is installed
if ! command -v ruby &> /dev/null; then
  echo "Ruby is not installed. Please install Ruby 3.0.0 or newer."
  exit 1
fi

# Check Ruby version
ruby_version=$(ruby -v | cut -d' ' -f2)
echo "Using Ruby version: $ruby_version"

# Check if Bundler is installed
if ! command -v bundle &> /dev/null; then
  echo "Installing Bundler..."
  gem install bundler
fi

# Install Ruby dependencies
echo "Installing Ruby gems..."
bundle install

echo "==============================================="
echo "          Installing Node Dependencies         "
echo "==============================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "Node.js is not installed. Please install Node.js 14.0.0 or newer."
  exit 1
fi

# Check Node version
node_version=$(node -v)
echo "Using Node.js version: $node_version"

# Check if Yarn is installed
if command -v yarn &> /dev/null; then
  echo "Using Yarn for Node dependencies..."
  yarn install
else
  echo "Using NPM for Node dependencies..."
  npm install
fi

echo "==============================================="
echo "           Setting up the Database             "
echo "==============================================="

# Check if PostgreSQL is running
if ! command -v pg_isready &> /dev/null || ! pg_isready &> /dev/null; then
  echo "WARNING: PostgreSQL might not be running. Make sure it's started."
fi

# Setup the database
echo "Creating and migrating the database..."
bundle exec rails db:create
bundle exec rails db:migrate

# Seed the database if needed
echo "Do you want to seed the database with sample data? (y/n)"
read -r seed_response
if [[ "$seed_response" =~ ^[Yy]$ ]]; then
  echo "Seeding the database..."
  bundle exec rails db:seed
fi

echo "==============================================="
echo "            Precompiling Assets                "
echo "==============================================="

# Precompile assets
echo "Precompiling assets..."
bundle exec rails assets:precompile

echo "==============================================="
echo "          Starting the Application             "
echo "==============================================="

# Clear any tmp files
echo "Clearing temporary files..."
bundle exec rails tmp:clear

# Check for running servers
if pgrep -f "rails s" > /dev/null; then
  echo "A Rails server is already running. Stopping it..."
  pkill -f "rails s"
  sleep 2
fi

# Start the server
echo "Starting the Rails server..."
bundle exec rails server -p 3000 &

# Store the PID
RAILS_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Check if server started successfully
if ps -p $RAILS_PID > /dev/null; then
  echo "Server started successfully!"
  echo "==============================================="
  echo "  Test Project is now running on port 3000    "
  echo "  Access it at: http://localhost:3000         "
  echo "                                               "
  echo "  Press Ctrl+C to stop the server             "
  echo "==============================================="
else
  echo "Failed to start the server. Check the logs for errors."
  exit 1
fi

# Wait for user to stop the server
trap "echo 'Stopping the server...'; kill $RAILS_PID; exit" INT TERM
wait $RAILS_PID