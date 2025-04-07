import React from 'react';
import PropTypes from 'prop-types';

const LocationCard = ({ id, name, description, createdBy, latitude, longitude }) => {
  return (
    <div className="bg-white rounded-lg border border-[#3D2D1C]/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full">
      <div className="p-5 flex-grow">
        <h3 className="text-[#3D2D1C] font-semibold text-lg mb-2 truncate">{name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description || 'No description provided.'}</p>
        
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-[#3D2D1C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm text-gray-500">{latitude}, {longitude}</span>
        </div>
      </div>
      
      {createdBy && (
        <div className="px-5 py-3 border-t border-[#3D2D1C]/10 flex items-center bg-gray-50 rounded-b-lg">
          <div className="w-6 h-6 rounded-full bg-[#3D2D1C]/10 flex-shrink-0 mr-2 flex items-center justify-center text-[#3D2D1C]">
            {createdBy.name.charAt(0).toUpperCase()}
          </div>
          <span className="text-xs text-gray-600">Added by {createdBy.name}</span>
        </div>
      )}
    </div>
  );
};

LocationCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  createdBy: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default LocationCard; 