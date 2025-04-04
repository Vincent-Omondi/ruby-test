// Entry point for the build script in your package.json
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import "@hotwired/turbo-rails"
import "./controllers"

// Initialize Inertia.js progress indicator
InertiaProgress.init({
  color: '#3D2D1C',
  showSpinner: true,
});

// Create Inertia App
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');
  
  if (el) {
    try {
      // Parse the JSON data
      const pageContent = el.dataset.page;
      console.log('Raw page content:', pageContent);
      
      const pageData = pageContent && JSON.parse(pageContent);
      console.log('Parsed page data:', pageData);
      
      if (!pageData || !pageData.component) {
        console.error('Invalid Inertia page data - missing component name');
        return;
      }
      
      createInertiaApp({
        resolve: async name => {
          if (!name) {
            throw new Error('Component name is undefined');
          }
          
          try {
            console.log(`Loading component: ${name}`);
            // Import relative to where this file is located
            const module = await import(`../frontend/pages/${name}.jsx`);
            console.log('Module loaded:', module);
            return module.default;
          } catch (error) {
            console.error(`Failed to load page: ${name}`, error);
            throw error;
          }
        },
        setup({ el, App, props }) {
          console.log('Setting up Inertia app with component:', App);
          console.log('Setting up Inertia app with props:', props);
          createRoot(el).render(React.createElement(App, props));
        },
        page: pageData
      });
    } catch (error) {
      console.error('Error initializing Inertia app:', error);
    }
  } else {
    console.error('No #app element found for Inertia mounting');
  }
});
