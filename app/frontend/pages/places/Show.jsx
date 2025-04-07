import React from 'react';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';
import MapDisplay from '../../components/map/MapDisplay';

const PlaceShow = ({ place }) => {
  return (
    <MainLayout title={`${place.name} | Test Project`}>
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#3D2D1C] text-white p-6">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{place.name}</h1>
                <a 
                  href="/places" 
                  className="bg-white text-[#3D2D1C] px-4 py-2 rounded-md hover:bg-gray-100 text-sm font-medium"
                >
                  Back to All Places
                </a>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 md:pr-6 mb-6 md:mb-0">
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-gray-800 mb-2">Description</h3>
                    <p className="text-gray-700">{place.description}</p>
                  </div>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-6">
                    <h3 className="font-bold text-gray-800 mb-2">Details</h3>
                    <div className="space-y-2">
                      <p className="text-gray-700"><strong>Added by:</strong> {place.created_by.name}</p>
                      <p className="text-gray-700"><strong>Coordinates:</strong> {place.latitude}, {place.longitude}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/2">
                  <MapDisplay places={[place]} className="h-64 md:h-96 rounded-lg overflow-hidden" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

PlaceShow.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    created_by: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number
    })
  }).isRequired
};

export default PlaceShow; 