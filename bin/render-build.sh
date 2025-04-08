#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install
yarn install

# Build frontend assets
bundle exec rails assets:precompile
bundle exec rails assets:clean

# Database setup - for first deployment to create the places table
# We'll use db:schema:load which is safer than db:reset in production
bundle exec rails db:schema:load
bundle exec rails db:migrate

# Enable this if you need to seed data
# bundle exec rails db:seed
