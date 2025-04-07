// Entry point for the build script in your package.json
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { InertiaProgress } from '@inertiajs/progress';
import "@hotwired/turbo-rails"
import "./controllers"
import ErrorComponent from '../frontend/pages/Error';

// Preload critical auth components to prevent white screen issues
import LoginComponent from '../frontend/pages/auth/Login.jsx';
import RegisterComponent from '../frontend/pages/auth/Register.jsx';
import NewPlaceComponent from '../frontend/pages/places/New.jsx';

// Create a component cache to avoid loading issues
const componentCache = {
  'Error': ErrorComponent,
  'auth/Login': LoginComponent,
  'Login': LoginComponent,
  'Sign_in': LoginComponent,
  'auth/Register': RegisterComponent,
  'Register': RegisterComponent,
  'Sign_up': RegisterComponent,
  'places/New': NewPlaceComponent,
  'New': NewPlaceComponent
};

// Initialize Inertia.js progress indicator
InertiaProgress.init({
  color: '#3D2D1C',
  showSpinner: true,
});

// Utility function to handle clicks on auth page links
function setupAuthLinkInterceptor() {
  document.addEventListener('click', (event) => {
    // Check if the clicked element is a link
    let target = event.target;
    while (target && target.tagName !== 'A') {
      target = target.parentElement;
    }
    
    if (target && target.tagName === 'A') {
      const href = target.getAttribute('href');
      if (href && (href.includes('/users/sign_in') || href.includes('/users/sign_up'))) {
        console.log('Auth link clicked, forcing full page navigation');
        event.preventDefault();
        window.location.href = href;
      }
    }
  });
}

// Create Inertia App
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('app');
  
  if (!el) {
    console.error('No #app element found for Inertia mounting');
    return;
  }
  
  // IMPORTANT: Check if we're on an auth page
  const isAuthPage = window.location.pathname.includes('/users/sign_in') || 
                     window.location.pathname.includes('/users/sign_up');
                     
  if (isAuthPage) {
    console.log('Auth page detected - initializing with special handling');
    setupAuthLinkInterceptor();
  }
  
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
        
        // IMPORTANT: Make sure greeting, description, and places are included
        // This is where the data is being lost
        if (!pageData.props.places) {
          console.warn('Places prop is missing from the page data');
          pageData.props.places = [];
        }
        
        if (!pageData.props.greeting) {
          pageData.props.greeting = "Find and Share Locations Around the World";
        }
        
        if (!pageData.props.description) {
          pageData.props.description = "Explore interesting places or add your own locations to the map";
        }
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
      
      // Special handling for auth pages
      if (isAuthPage && pageData.component) {
        if (pageData.component === 'Sign_in' || pageData.component === 'auth/Login') {
          console.log('Setting component explicitly to auth/Login');
          pageData.component = 'auth/Login';
        } else if (pageData.component === 'Sign_up' || pageData.component === 'auth/Register') {
          console.log('Setting component explicitly to auth/Register');
          pageData.component = 'auth/Register';
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
    
    // Set up interceptor AFTER initializing Inertia
    if (!isAuthPage) {
      setupAuthLinkInterceptor();
    }
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
  
  // Function to initialize Inertia with the given page data
  function initInertia(pageData) {
    createInertiaApp({
      resolve: async name => {
        if (!name) {
          console.error('Component name is undefined');
          return ErrorComponent;
        }
        
        // Check if the component is in our preloaded cache
        if (componentCache[name]) {
          console.log(`Loading component from cache: ${name}`);
          return componentCache[name];
        }
        
        // Special case for places/New
        if (name === 'New' || name === 'places/New') {
          console.log('Loading places/New component');
          return NewPlaceComponent;
        }
        
        try {
          console.log(`Loading component: ${name}`);
          
          // Special case for Error component
          if (name === 'Error') {
            return ErrorComponent;
          }
          
          try {
            // First, normalize the component name to match file structure
            let componentPath = name;
            
            // Handle auth paths more reliably
            if (name === 'auth/Login' || name === 'Login' || name === 'Sign_in') {
              console.log('Loading auth/Login component');
              const LoginComponent = (await import('../frontend/pages/auth/Login.jsx')).default;
              console.log('Login component loaded:', LoginComponent);
              return LoginComponent;
            }
            
            if (name === 'auth/Register' || name === 'Register' || name === 'Sign_up') {
              console.log('Loading auth/Register component');
              const RegisterComponent = (await import('../frontend/pages/auth/Register.jsx')).default;
              console.log('Register component loaded:', RegisterComponent);
              return RegisterComponent;
            }
            
            // Import relative to where this file is located - support nested components
            console.log(`Attempting to load from path: ../frontend/pages/${componentPath}.jsx`);
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
            
            // Last resort - try loading auth pages directly
            if (name.includes('sign_in') || name === 'Sign_in') {
              return LoginComponent;
            }
            
            if (name.includes('sign_up') || name === 'Sign_up') {
              return RegisterComponent;
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
