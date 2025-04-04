import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
};

const New = () => {
  const [position, setPosition] = useState(null);
  
  const { data, setData, errors, post, processing } = useForm({
    name: '',
    latitude: '',
    longitude: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/locations');
  };

  React.useEffect(() => {
    if (position) {
      setData({
        ...data,
        latitude: position[0],
        longitude: position[1]
      });
    }
  }, [position]);

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Add New Location</h1>
          <Link 
            href="/locations" 
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Back to Locations
          </Link>
        </div>
        
        <div className="mt-6">
          <form onSubmit={handleSubmit}>
            <div className="shadow sm:rounded-md sm:overflow-hidden">
              <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={data.name}
                      onChange={e => setData('name', e.target.value)}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="latitude"
                        name="latitude"
                        value={data.latitude}
                        onChange={e => setData('latitude', e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {errors.latitude && (
                      <p className="mt-2 text-sm text-red-600">{errors.latitude}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        id="longitude"
                        name="longitude"
                        value={data.longitude}
                        onChange={e => setData('longitude', e.target.value)}
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    {errors.longitude && (
                      <p className="mt-2 text-sm text-red-600">{errors.longitude}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="block text-sm font-medium text-gray-700 mb-2">
                    Click on the map to set the location
                  </p>
                  <div className="border-2 border-gray-300 rounded-lg h-80">
                    <MapContainer 
                      center={[0, 0]} 
                      zoom={2} 
                      scrollWheelZoom={true}
                      style={{ height: '100%', width: '100%' }}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <LocationMarker position={position} setPosition={setPosition} />
                    </MapContainer>
                  </div>
                </div>
              </div>
              
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Save Location
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default New; 