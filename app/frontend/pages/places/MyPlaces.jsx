import React from 'react';
import PropTypes from 'prop-types';
import { Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';
import MapDisplay from '../../components/map/MapDisplay';

const MyPlaces = ({ places = [] }) => {
  return (
    <MainLayout title="My Locations | Test Project">
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Locations</h1>
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
              <h2 className="text-xl font-bold text-gray-800 mb-4">Your Location List</h2>
              
              {places.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">You haven't added any locations yet.</p>
                  <a 
                    href="/places/new" 
                    className="inline-block bg-[#3D2D1C] text-white px-4 py-2 rounded-md hover:bg-[#4E3D2C] text-sm font-medium"
                  >
                    Add Your First Location
                  </a>
                </div>
              ) : (
                <div className="overflow-hidden shadow-md rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coordinates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Added On</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {places.map(place => (
                        <tr key={place.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{place.name}</div>
                            <div className="text-sm text-gray-500">{place.description.substring(0, 50)}...</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {place.latitude}, {place.longitude}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(place.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <a 
                                href={`/places/${place.id}`} 
                                className="text-blue-600 hover:text-blue-900"
                              >
                                View
                              </a>
                              <a 
                                href={`/places/${place.id}/edit`} 
                                className="text-green-600 hover:text-green-900"
                              >
                                Edit
                              </a>
                              <a 
                                href="#" 
                                className="text-red-600 hover:text-red-900"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (confirm('Are you sure you want to delete this location?')) {
                                    // Create a form and submit it to delete
                                    const form = document.createElement('form');
                                    form.method = 'POST';
                                    form.action = `/places/${place.id}`;
                                    
                                    const methodInput = document.createElement('input');
                                    methodInput.type = 'hidden';
                                    methodInput.name = '_method';
                                    methodInput.value = 'delete';
                                    form.appendChild(methodInput);
                                    
                                    const tokenInput = document.createElement('input');
                                    tokenInput.type = 'hidden';
                                    tokenInput.name = 'authenticity_token';
                                    tokenInput.value = document.querySelector('meta[name="csrf-token"]').content;
                                    form.appendChild(tokenInput);
                                    
                                    document.body.appendChild(form);
                                    form.submit();
                                  }
                                }}
                              >
                                Delete
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

MyPlaces.propTypes = {
  places: PropTypes.array
};

export default MyPlaces; 