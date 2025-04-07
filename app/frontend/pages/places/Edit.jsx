import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';

const EditPlace = ({ place, csrf_token, errors = [] }) => {
  const { data, setData, put, processing } = useForm({
    name: place.name,
    description: place.description,
    latitude: place.latitude,
    longitude: place.longitude,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(`/places/${place.id}`, {
      onSuccess: () => {
        // Redirect is handled by controller
      },
    });
  };

  return (
    <MainLayout title="Edit Location | Test Project">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Location</h1>
          
          {errors.length > 0 && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 text-red-700 p-4">
              <p className="font-bold">Please fix the following errors:</p>
              <ul className="list-disc ml-5">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="authenticity_token" value={csrf_token} />
            <input type="hidden" name="_method" value="put" />
            
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Location Name
              </label>
              <input
                id="name"
                type="text"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                required
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="latitude" className="block text-sm font-medium text-gray-700 mb-2">
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="text"
                  value={data.latitude}
                  onChange={(e) => setData('latitude', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="longitude" className="block text-sm font-medium text-gray-700 mb-2">
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="text"
                  value={data.longitude}
                  onChange={(e) => setData('longitude', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <a 
                href={`/places/${place.id}`}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </a>
              <button
                type="submit"
                disabled={processing}
                className="bg-[#3D2D1C] text-white py-2 px-4 rounded-md hover:bg-[#4E3D2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D2D1C] disabled:opacity-75"
              >
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

EditPlace.propTypes = {
  place: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string
  }).isRequired,
  csrf_token: PropTypes.string.isRequired,
  errors: PropTypes.array
};

export default EditPlace; 