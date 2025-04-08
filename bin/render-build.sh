#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install
yarn install

# Ensure build directories exist
mkdir -p app/assets/builds

# Build frontend assets properly
echo "Building CSS..."
yarn build:css

echo "Building JS..."
yarn build

# Build Rails assets
echo "Precompiling Rails assets..."
bundle exec rails assets:precompile
bundle exec rails assets:clean

# Run standard migrations
bundle exec rails db:migrate

# Use the custom rake task to force reset the database
echo "Forcing database reset..."
bundle exec rake db:force_reset

# Enable this if you need to seed data
# bundle exec rails db:seed
