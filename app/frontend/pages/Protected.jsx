import React from 'react';
import { usePage, Head } from '@inertiajs/react';
import MainLayout from '../components/layouts/MainLayout';

const Protected = () => {
  const { auth } = usePage().props;

  return (
    <MainLayout title="Protected Page | Test Project">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Protected Page</h1>
          
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
            <p className="font-medium">Authentication successful!</p>
            <p>This page is only visible to authenticated users.</p>
          </div>
          
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="font-bold mb-2">Your User Information:</h2>
            <p><strong>Email:</strong> {auth.user.email}</p>
            <p><strong>ID:</strong> {auth.user.id}</p>
            {auth.user.admin && <p><span className="inline-block bg-blue-500 text-white px-2 py-1 rounded-md text-sm">Admin</span></p>}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Protected; 