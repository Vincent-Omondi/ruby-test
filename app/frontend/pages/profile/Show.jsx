import React from 'react';
import { Head, Link } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';

const ProfileShow = ({ user }) => {
  // Format the date for display
  const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <MainLayout title="My Profile | Test Project">
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-[#3D2D1C] text-white p-6">
              <h1 className="text-2xl font-bold">My Profile</h1>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 md:pr-8 mb-6 md:mb-0">
                  <div className="bg-gray-100 rounded-lg p-6 text-center">
                    <div className="w-32 h-32 bg-[#4E3D2C] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                      {user.email.charAt(0).toUpperCase()}
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{user.email}</h2>
                    <p className="text-gray-600 text-sm mb-4">Member since {formattedDate}</p>
                    
                    <Link 
                      href="/profile/edit" 
                      className="inline-block bg-[#3D2D1C] text-white py-2 px-4 rounded-md hover:bg-[#4E3D2C] text-sm font-medium"
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <div className="bg-white rounded-lg">
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Account Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                          <p className="text-gray-800">{user.email}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">User ID</label>
                          <p className="text-gray-800">{user.id}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Account Created</label>
                          <p className="text-gray-800">{formattedDate}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">Account Actions</h3>
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3">
                          <Link 
                            href="/profile/edit" 
                            className="inline-flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 text-sm font-medium"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit Profile
                          </Link>
                          
                          <Link 
                            href="/settings" 
                            className="inline-flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 text-sm font-medium"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Settings
                          </Link>
                          
                          <Link 
                            href="/users/password/edit" 
                            className="inline-flex items-center bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 text-sm font-medium"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                            Change Password
                          </Link>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">My Activity</h3>
                      <div className="space-y-4">
                        <Link 
                          href="/my-places" 
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="bg-blue-100 p-2 rounded-full mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-gray-800 font-medium">My Places</h4>
                            <p className="text-gray-500 text-sm">View and manage your locations</p>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                        
                        <Link 
                          href="/analytics" 
                          className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                        >
                          <div className="bg-green-100 p-2 rounded-full mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                            </svg>
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-gray-800 font-medium">My Analytics</h4>
                            <p className="text-gray-500 text-sm">View insights and statistics</p>
                          </div>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProfileShow; 