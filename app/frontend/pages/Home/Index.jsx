import React from 'react';
import { Link } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Index = ({ locations, auth }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              Location Pins Application
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="rounded-lg h-96 border-2 border-gray-300">
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
              
              <div className="mt-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Welcome to Location Pins</h2>
                <p className="mt-4 text-lg text-gray-500">
                  Create and manage your favorite locations on the map
                </p>
                
                <div className="mt-8 flex justify-center space-x-4">
                  <Link 
                    href="/locations" 
                    className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-md"
                  >
                    View All Locations
                  </Link>
                  
                  {auth?.user && (
                    <Link 
                      href="/locations/new" 
                      className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 shadow-md"
                    >
                      Add New Location
                    </Link>
                  )}
                  
                  {auth?.user && auth.user.admin && (
                    <Link 
                      href="/admin/users" 
                      className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 shadow-md"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index; 