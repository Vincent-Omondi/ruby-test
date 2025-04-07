import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useForm } from '@inertiajs/react';

const LocationCard = ({ id, name, description, createdBy, latitude, longitude, currentUserId }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { delete: deleteLocation, processing } = useForm();

  // Check if the current user is the creator of this location
  const isOwner = currentUserId && createdBy && currentUserId === createdBy.id;

  const handleDelete = () => {
    deleteLocation(`/places/${id}`);
  };

  return (
    <div className="bg-white rounded-lg border border-[#3D2D1C]/20 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full relative">
      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Delete Location</h3>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete "{name}"? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={processing}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                {processing ? 'Deleting...' : 'Delete Location'}
              </button>
            </div>
          </div>
        </div>
      )}

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
      
      <div className="px-5 py-3 border-t border-[#3D2D1C]/10 flex items-center justify-between bg-gray-50 rounded-b-lg">
        <div className="flex items-center">
          <div className="w-6 h-6 rounded-full bg-[#3D2D1C]/10 flex-shrink-0 mr-2 flex items-center justify-center text-[#3D2D1C]">
            {createdBy && createdBy.name ? createdBy.name.charAt(0).toUpperCase() : '?'}
          </div>
          <span className="text-xs text-gray-600">Added by {createdBy ? createdBy.name : 'Unknown'}</span>
        </div>
        
        {isOwner && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 hover:text-red-800 text-xs font-medium bg-white rounded px-2 py-1 shadow-sm border border-red-200"
          >
            Delete
          </button>
        )}
      </div>
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
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }),
  currentUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default LocationCard; 