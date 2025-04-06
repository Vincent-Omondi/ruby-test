import React from 'react';
import { Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';

const DashboardIndex = ({ user, stats }) => {
  return (
    <MainLayout title="Dashboard | Test Project">
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to your Dashboard</h1>
            <p className="text-gray-600 mb-6">
              Hello {user.email}, this is your personal dashboard where you can manage your places and settings.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-blue-800">Your Places</h3>
                  <span className="text-3xl font-bold text-blue-600">{stats.places_count}</span>
                </div>
                <p className="text-blue-600 text-sm">
                  Locations you've added to the platform
                </p>
                <div className="mt-4">
                  <a 
                    href="/my-places"
                    className="text-blue-700 hover:text-blue-900 text-sm font-medium"
                  >
                    View all places &rarr;
                  </a>
                </div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-green-800">Total Visits</h3>
                  <span className="text-3xl font-bold text-green-600">{stats.visits}</span>
                </div>
                <p className="text-green-600 text-sm">
                  Number of visits to your places
                </p>
                <div className="mt-4">
                  <a 
                    href="/analytics"
                    className="text-green-700 hover:text-green-900 text-sm font-medium"
                  >
                    View analytics &rarr;
                  </a>
                </div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-purple-800">Likes</h3>
                  <span className="text-3xl font-bold text-purple-600">{stats.likes}</span>
                </div>
                <p className="text-purple-600 text-sm">
                  Number of likes on your places
                </p>
                <div className="mt-4">
                  <a 
                    href="/interactions"
                    className="text-purple-700 hover:text-purple-900 text-sm font-medium"
                  >
                    View details &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="/places/new" 
                className="bg-[#3D2D1C] text-white p-4 rounded-lg text-center hover:bg-[#4E3D2C] transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Place
              </a>
              
              <a 
                href="/profile" 
                className="bg-gray-200 text-gray-800 p-4 rounded-lg text-center hover:bg-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Edit Profile
              </a>
              
              <a 
                href="/settings" 
                className="bg-gray-200 text-gray-800 p-4 rounded-lg text-center hover:bg-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
              
              <a 
                href="/explore" 
                className="bg-gray-200 text-gray-800 p-4 rounded-lg text-center hover:bg-gray-300 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                Explore Map
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center p-4 border-b border-gray-100">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">You added a new place</p>
                  <p className="text-gray-500 text-sm">Tech Hub Coworking Space</p>
                  <p className="text-gray-400 text-xs">3 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-4 border-b border-gray-100">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Your place received a like</p>
                  <p className="text-gray-500 text-sm">Serene Park Viewpoint</p>
                  <p className="text-gray-400 text-xs">5 days ago</p>
                </div>
              </div>
              
              <div className="flex items-center p-4">
                <div className="bg-purple-100 p-2 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800 font-medium">Someone visited your place</p>
                  <p className="text-gray-500 text-sm">Downtown Cultural Center</p>
                  <p className="text-gray-400 text-xs">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DashboardIndex; 