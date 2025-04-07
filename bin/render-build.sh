#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install
yarn install

# Build frontend assets
bundle exec rails assets:precompile
bundle exec rails assets:clean

# Run migrations
bundle exec rails db:migrate
