#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies with --no-audit to speed up the process
bundle install
yarn install --no-audit

# Ensure build directories exist
mkdir -p app/assets/builds

# Install required packages explicitly
echo "Installing required packages..."
yarn add glob webpack webpack-cli babel-loader @babel/core @babel/preset-env @babel/preset-react

# Try building with esbuild first
echo "Attempting to build with esbuild..."
if yarn build; then
  echo "esbuild successful!"
else
  echo "esbuild failed, trying webpack fallback..."
  # If esbuild fails, try webpack
  npx webpack --config webpack.config.js
fi

# Build CSS
echo "Building CSS..."
yarn build:css

# Create a simple application.css if it doesn't exist
if [ ! -f app/assets/builds/application.css ]; then
  echo "Creating simple application.css..."
  echo "/* Basic application styles */" > app/assets/builds/application.css
  echo "body { font-family: system-ui, sans-serif; }" >> app/assets/builds/application.css
fi

# Run database migrations
echo "Running database migrations..."
bundle exec rails db:migrate

# Copy assets to public directory directly as a last resort
echo "Ensuring assets are accessible..."
mkdir -p public/assets
cp -r app/assets/builds/* public/assets/ || true

# Use the custom rake task to force reset the database
echo "Forcing database reset..."
bundle exec rake db:force_reset

# Enable this if you need to seed data
# bundle exec rails db:seed
