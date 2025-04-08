#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install
yarn install

# Build frontend assets
bundle exec rails assets:precompile
bundle exec rails assets:clean

# Reset database and run migrations (for first deployment)
bundle exec rails db:schema:load
bundle exec rails db:migrate
