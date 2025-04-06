// Entry point for the build script in your package.json
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import "@hotwired/turbo-rails"
import "./controllers"
import ErrorComponent from '../frontend/pages/Error';

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
      // Get the page content from the data attribute
      const pageContent = el.dataset.page;
      console.log('Raw page content:', pageContent);
      
      // Check if page content is valid before parsing
      if (!pageContent || pageContent === '{}' || pageContent.trim() === '') {
        console.error('Empty page content - redirecting to home page');
        window.location.href = '/';
        return;
      }
      
      // Try to parse the JSON data
      let pageData;
      try {
        pageData = JSON.parse(pageContent);
        
        // Debug check for props content
        if (pageData && pageData.props) {
          console.log('All page props keys:', Object.keys(pageData.props));
        }
        
        // Ensure auth is always present
        if (pageData && pageData.props && !pageData.props.auth) {
          console.log('Adding default auth object to props');
          pageData.props.auth = { user: null };
        } else if (pageData && pageData.props && pageData.props.auth) {
          console.log('Auth data found:', pageData.props.auth);
          
          // Check if user is authenticated
          if (pageData.props.auth.user) {
            console.log('User is authenticated:', pageData.props.auth.user);
          } else {
            console.log('User is not authenticated');
          }
        }
      } catch (jsonError) {
        console.error('Error parsing JSON data:', jsonError);
        console.error('Raw content that failed to parse:', pageContent);
        // Create a default page data with Error component
        pageData = {
          component: 'Error',
          props: { status: 500, message: 'Failed to parse page data' },
          url: window.location.pathname + window.location.search
        };
      }
      
      console.log('Parsed page data:', pageData);
      
      if (!pageData || !pageData.component) {
        console.error('Invalid Inertia page data - missing component name');
        window.location.href = '/';
        return;
      }
      
      // Ensure URL is set to prevent 'this.page.url is undefined' error
      if (!pageData.url) {
        pageData.url = window.location.pathname + window.location.search;
      }
      
      // Initialize Inertia with the page data
      initInertia(pageData);
    } catch (error) {
      console.error('Error initializing Inertia app:', error);
      
      // Fallback to an error message in the DOM if all else fails
      if (el) {
        el.innerHTML = `<div style="padding: 20px; color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 4px;">
          <h1>Error Initializing Application</h1>
          <p>${error.message || 'Unknown error'}</p>
          <p><a href="/" style="color: #721c24; text-decoration: underline;">Return to Home</a></p>
        </div>`;
      }
    }
  } else {
    console.error('No #app element found for Inertia mounting');
  }
  
  // Function to initialize Inertia with the given page data
  function initInertia(pageData) {
    createInertiaApp({
      resolve: async name => {
        if (!name) {
          console.error('Component name is undefined');
          return ErrorComponent;
        }
        
        try {
          console.log(`Loading component: ${name}`);
          
          // Special case for Error component
          if (name === 'Error') {
            return ErrorComponent;
          }
          
          try {
            // First, normalize the component name to match file structure
            // Convert controller paths like "users/sign_in" to components
            let componentPath = name;
            
            // Check if this is a Rails controller path that needs remapping
            if (componentPath === 'Sign_in') {
              componentPath = 'auth/Login';
            } else if (componentPath === 'Sign_up') {
              componentPath = 'auth/Register';
            }
            
            console.log(`Attempting to load: ${componentPath}`);
            
            // Import relative to where this file is located - support nested components
            const module = await import(`../frontend/pages/${componentPath}.jsx`);
            console.log('Module loaded:', module);
            
            if (!module || !module.default) {
              console.error(`Module loaded but no default export found for ${componentPath}`);
              return ErrorComponent;
            }
            
            return module.default;
          } catch (importError) {
            console.error(`Error importing component: ${name}`, importError);
            console.error('Import error message:', importError.message);
            
            // Try with alternate slashing - convert path with slashes to directory structure
            if (name.includes('/')) {
              try {
                console.log(`Trying alternate import for ${name}`);
                return (await import(`../frontend/pages/${name}.jsx`)).default;
              } catch (alternateError) {
                console.error(`Alternate import also failed for ${name}:`, alternateError.message);
                return ErrorComponent;
              }
            }
            
            return ErrorComponent;
          }
        } catch (error) {
          console.error(`Failed to load page: ${name}`, error);
          console.error('Error details:', error.message);
          // Fallback to Error component if other components fail to load
          return ErrorComponent;
        }
      },
      setup({ el, App, props }) {
        console.log('Setting up Inertia app with component:', App);
        console.log('Setting up Inertia app with props:', props);
        
        try {
          createRoot(el).render(React.createElement(App, props));
        } catch (error) {
          console.error('Error rendering component:', error);
          createRoot(el).render(React.createElement(ErrorComponent, { 
            status: 500,
            message: `Error rendering component: ${error.message}` 
          }));
        }
      },
      page: pageData
    }).catch(error => {
      console.error('Error in createInertiaApp:', error);
      if (el) {
        createRoot(el).render(React.createElement(ErrorComponent, { 
          status: 500,
          message: `Error in Inertia app creation: ${error.message}` 
        }));
      }
    });
  }
});
