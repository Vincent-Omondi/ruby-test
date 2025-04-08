#!/usr/bin/env bash
# exit on error
set -o errexit

# Install dependencies
bundle install
yarn install

# Ensure build directories exist
mkdir -p app/assets/builds

# Fix asset paths issue
if [ ! -d app/javascript ]; then
  echo "Creating app/javascript directory"
  mkdir -p app/javascript
fi

# Create required JavaScript entry point if missing
if [ ! -f app/javascript/application.js ]; then
  echo "Creating basic application.js file"
  echo "// Entry point for the build script" > app/javascript/application.js
  echo "import React from 'react';" >> app/javascript/application.js
  echo "import { createRoot } from 'react-dom/client';" >> app/javascript/application.js
  echo "import { createInertiaApp } from '@inertiajs/react';" >> app/javascript/application.js
  echo "import { resolvePageComponent } from '@inertiajs/core/server';" >> app/javascript/application.js
  echo "" >> app/javascript/application.js
  echo "document.addEventListener('DOMContentLoaded', () => {" >> app/javascript/application.js
  echo "  createInertiaApp({" >> app/javascript/application.js
  echo "    resolve: name => resolvePageComponent(name, import.meta.glob('./pages/**/*.jsx'))," >> app/javascript/application.js
  echo "    setup({ el, App, props }) {" >> app/javascript/application.js
  echo "      createRoot(el).render(<App {...props} />);" >> app/javascript/application.js
  echo "    }" >> app/javascript/application.js
  echo "  });" >> app/javascript/application.js
  echo "});" >> app/javascript/application.js
fi

# Fix the build script to use the proper paths
echo "const path = require('path');" > esbuild.config.js
echo "const glob = require('glob');" >> esbuild.config.js
echo "" >> esbuild.config.js
echo "require('esbuild').build({" >> esbuild.config.js
echo "  entryPoints: ['app/javascript/application.js']," >> esbuild.config.js
echo "  bundle: true," >> esbuild.config.js
echo "  outdir: 'app/assets/builds'," >> esbuild.config.js
echo "  absWorkingDir: path.join(process.cwd())," >> esbuild.config.js
echo "  sourcemap: true," >> esbuild.config.js
echo "  format: 'esm'," >> esbuild.config.js
echo "  loader: { '.js': 'jsx', '.jsx': 'jsx' }," >> esbuild.config.js
echo "  publicPath: '/assets'," >> esbuild.config.js
echo "}).catch(() => process.exit(1));" >> esbuild.config.js

# Create a bare CSS file if needed
if [ ! -f app/assets/stylesheets/application.tailwind.css ]; then
  echo "Creating application.tailwind.css"
  echo "@tailwind base;" > app/assets/stylesheets/application.tailwind.css
  echo "@tailwind components;" >> app/assets/stylesheets/application.tailwind.css
  echo "@tailwind utilities;" >> app/assets/stylesheets/application.tailwind.css
fi

# Build assets explicitly using node directly 
echo "Building CSS with tailwind..."
yarn tailwindcss -i ./app/assets/stylesheets/application.tailwind.css -o ./app/assets/builds/application.tailwind.css --minify

echo "Building JS with esbuild..."
node esbuild.config.js

# Create basic application.css if missing
if [ ! -f app/assets/builds/application.css ]; then
  echo "Creating basic application.css"
  echo "/* Base application styles */" > app/assets/builds/application.css
  echo "body { font-family: sans-serif; margin: 0; padding: 0; }" >> app/assets/builds/application.css
fi

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
