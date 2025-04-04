import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { MainLayout } from '../components/layouts';
import { resolvePageComponent } from '@inertiajs/react/server';

createInertiaApp({
  // The page prop will be the actual page component
  resolve: async (name) => {
    const page = await resolvePageComponent(`../pages/${name}.jsx`, import.meta.glob('../pages/**/*.jsx'));
    
    // Set default layout for all pages
    page.default.layout = page.default.layout || ((page) => <MainLayout>{page}</MainLayout>);
    
    return page;
  },
  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />);
  },
}); 