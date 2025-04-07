import React from 'react';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';
import MapDisplay from '../../components/map/MapDisplay';

const PlacesIndex = ({ places = [] }) => {
  return (
    <MainLayout title="All Locations | Test Project">
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">All Locations</h1>
              <a 
                href="/places/new" 
                className="bg-[#3D2D1C] text-white px-4 py-2 rounded-md hover:bg-[#4E3D2C] text-sm font-medium"
              >
                Add New Location
              </a>
            </div>
            
            <div className="mb-8">
              <MapDisplay places={places} className="h-96 rounded-lg overflow-hidden" />
            </div>
            
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Location List</h2>
              
              {places.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No locations have been added yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {places.map(place => (
                    <div key={place.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{place.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{place.description}</p>
                        <div className="text-gray-500 text-xs">
                          <p>Coordinates: {place.latitude}, {place.longitude}</p>
                          <p>Added by: {place.created_by.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

PlacesIndex.propTypes = {
  places: PropTypes.array
};

export default PlacesIndex; 