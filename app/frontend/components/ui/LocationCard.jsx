import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';

const LocationCard = ({ id, name, description, image, createdBy, latitude, longitude }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-40 bg-gray-300 relative">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <h3 className="text-white font-medium text-lg truncate">{name}</h3>
        </div>
      </div>
      
      <div className="p-4">
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{description || 'No description provided.'}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {latitude}, {longitude}
          </div>
          
          <div>
            <Link 
              href={`/locations/${id}`} 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
        
        {createdBy && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center">
            <div className="w-6 h-6 rounded-full bg-gray-300 flex-shrink-0 mr-2">
              {createdBy.avatar ? (
                <img 
                  src={createdBy.avatar} 
                  alt={createdBy.name} 
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full rounded-full flex items-center justify-center bg-indigo-100 text-indigo-500">
                  {createdBy.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <span className="text-xs text-gray-500">Added by {createdBy.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

LocationCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string,
  latitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  longitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  createdBy: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string,
  }),
};

export default LocationCard; 