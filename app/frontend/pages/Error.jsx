import React from 'react';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/react';
import MainLayout from '../components/layouts/MainLayout';

const Error = ({ status = 500, message = 'An error occurred' }) => {
  const title = {
    503: 'Service Unavailable',
    500: 'Server Error',
    404: 'Page Not Found',
    403: 'Forbidden',
    401: 'Unauthorized',
  }[status] || 'Error';

  return (
    <MainLayout title={`${title} | Test Project`}>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-6xl font-bold text-red-500 mb-4">{status || 'Error'}</h1>
          <p className="text-2xl font-bold text-gray-800 mb-6">{title}</p>
          
          {message && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-left">
              <p>{message}</p>
            </div>
          )}
          
          <div className="mt-6">
            <a 
              href="/"
              className="inline-block bg-[#3D2D1C] text-white py-2 px-4 rounded-md hover:bg-[#4E3D2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D2D1C]"
            >
              Go Home
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

Error.propTypes = {
  status: PropTypes.number,
  message: PropTypes.string,
};

export default Error; 