import React from 'react';
import PropTypes from 'prop-types';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../components/layouts/MainLayout';
import MapDisplay from '../components/map/MapDisplay';
import LocationCard from '../components/ui/LocationCard';

const Home = ({ greeting, description, places = [], auth }) => {
  // Debug all incoming props
  console.log('Raw Home component props:', { greeting, description, places, auth });
  
  // Ensure places is an array and log its contents
  const databasePlaces = Array.isArray(places) ? places : [];
  console.log('Processed database places:', databasePlaces);
  console.log('Database places count:', databasePlaces.length);
  
  // Sample locations fallback (use if no places provided)
  const sampleLocations = [
    {
      id: 'sample-1',
      name: 'Tech Hub Coworking Space',
      description: 'A modern workspace for tech professionals with high-speed internet and 24/7 access.',
      latitude: '-1.2921',
      longitude: '36.8219',
      created_by: { name: 'vin@gmail.com' }
    },
    {
      id: 'sample-2',
      name: 'Serene Park Viewpoint',
      description: 'Beautiful park with great views of the city skyline, perfect for outdoor activities.',
      latitude: '-1.2823',
      longitude: '36.8219',
      created_by: { name: 'vin@gmail.com' }
    },
    {
      id: 'sample-3',
      name: 'Downtown Cultural Center',
      description: 'Cultural hub hosting art exhibitions, performances and community events.',
      latitude: '-1.2884',
      longitude: '36.8233',
      created_by: { name: 'vin@gmail.com' }
    },
    {
      id: 'sample-4',
      name: 'Riverside Cafe',
      description: 'Quiet cafe with outdoor seating overlooking the river. Great for remote work.',
      latitude: '-1.2911',
      longitude: '36.8261',
      created_by: { name: 'vin@gmail.com' }
    }
  ];

  // Only use sample locations if we don't have any database places
  const locationsToDisplay = databasePlaces.length > 0 
    ? databasePlaces 
    : sampleLocations;
  console.log('Final locations to display:', locationsToDisplay);
  console.log('Total locations count:', locationsToDisplay.length);

  // Debug auth data if present
  if (auth) {
    console.log('Auth data in Home component:', auth);
  } else {
    console.warn('No auth data found in Home component props');
  }

  const isAuthenticated = auth && auth.user;

  return (
    <MainLayout title="Interactive Map | All Locations">
      {/* Hero Section */}
      <section className="bg-[#3D2D1C] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{greeting || "Find and share locations around the world"}</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
            {description || "Discover interesting places around the world and add your own locations"}
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#map-section" className="bg-white text-[#3D2D1C] hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
              View All Locations
            </a>
            {isAuthenticated ? (
              <Link href="/places/new" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium">
                Add Location
              </Link>
            ) : (
              <Link href="/users/sign_in" className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-3 rounded-md font-medium">
                Sign In to Add
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map-section" className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center mb-8">
            <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Interactive Map</h2>
              <p className="text-gray-600 mb-6">
                Explore all locations on our interactive map. Click on pins to view details about each location.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-500 p-2 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Discover Places</h3>
                    <p className="text-sm text-gray-500">Find new and interesting locations</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-green-500 p-2 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Add Your Own</h3>
                    <p className="text-sm text-gray-500">Contribute to the community by adding locations</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-500 p-2 rounded-md mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Connect</h3>
                    <p className="text-sm text-gray-500">Meet others who share your interests</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <MapDisplay places={locationsToDisplay} className="rounded-lg overflow-hidden shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Location Cards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">All Locations</h2>
            {isAuthenticated && (
              <Link href="/places/new" className="bg-[#3D2D1C] text-white px-4 py-2 rounded-md hover:bg-[#4E3D2C] text-sm font-medium">
                Add New Location
              </Link>
            )}
          </div>
          
          {locationsToDisplay.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-xl text-gray-500 mb-6">No locations have been added yet</p>
              {isAuthenticated ? (
                <Link href="/places/new" className="bg-[#3D2D1C] text-white hover:bg-[#4E3D2C] px-6 py-3 rounded-md font-medium">
                  Add First Location
                </Link>
              ) : (
                <Link href="/users/sign_in" className="bg-[#3D2D1C] text-white hover:bg-[#4E3D2C] px-6 py-3 rounded-md font-medium">
                  Sign In to Add Location
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {locationsToDisplay.map(location => (
                <LocationCard 
                  key={location.id}
                  id={location.id}
                  name={location.name}
                  description={location.description}
                  latitude={location.latitude}
                  longitude={location.longitude}
                  createdBy={location.created_by}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Only show for non-authenticated users */}
      {!isAuthenticated && (
        <section className="py-16 bg-yellow-50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Join Our Community</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8 text-gray-600">
              Sign up to add your own locations to our map and connect with others.
            </p>
            <div className="flex justify-center space-x-4">
              <a 
                href="/users/sign_up" 
                className="bg-[#3D2D1C] text-white hover:bg-[#4E3D2C] px-6 py-3 rounded-md font-medium"
              >
                Sign Up Now
              </a>
              <a 
                href="/users/sign_in" 
                className="bg-transparent border-2 border-[#3D2D1C] text-[#3D2D1C] hover:bg-[#3D2D1C]/10 px-6 py-3 rounded-md font-medium"
              >
                Sign In
              </a>
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

Home.propTypes = {
  greeting: PropTypes.string,
  description: PropTypes.string,
  places: PropTypes.array,
  auth: PropTypes.object
};

export default Home; 