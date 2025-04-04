import React from 'react';
import { Link } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Index = ({ locations, auth }) => {
  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-2xl font-semibold text-gray-900">Locations</h1>
        
        {auth?.user && (
          <div className="mt-4">
            <Link 
              href="/locations/new" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add New Location
            </Link>
          </div>
        )}
        
        {/* Map View */}
        <div className="mt-6 border-2 border-gray-300 rounded-lg h-96">
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
            
            {locations.map(location => (
              <Marker 
                key={location.id} 
                position={[location.latitude, location.longitude]}
              >
                <Popup>
                  <div>
                    <h3 className="font-bold">{location.name}</h3>
                    <p>Added by: {location.user.email}</p>
                    <Link 
                      href={`/locations/${location.id}`}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View Details
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        
        {/* List View */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900">All Locations</h2>
          <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {locations.map(location => (
                <li key={location.id}>
                  <Link 
                    href={`/locations/${location.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {location.name}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {location.user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            Lat: {location.latitude.toFixed(6)}, Long: {location.longitude.toFixed(6)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index; 