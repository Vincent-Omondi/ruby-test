import React from 'react';
import PropTypes from 'prop-types';

const MapDisplay = ({ className = '' }) => {
  return (
    <div className={`bg-blue-50 relative min-h-[400px] flex items-center justify-center ${className}`}>
      <div className="text-center p-8">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto text-blue-400 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
          />
        </svg>
        <h3 className="text-xl font-medium text-blue-900 mb-2">Interactive Map</h3>
        <p className="text-blue-600">
          Map will be implemented with Leaflet.js <br />
          For now, this is a placeholder.
        </p>
      </div>
    </div>
  );
};

MapDisplay.propTypes = {
  className: PropTypes.string,
};

export default MapDisplay; 