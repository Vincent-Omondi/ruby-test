import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';

const EditAccount = ({ csrf_token, resource, errors }) => {
  const { data, setData, put, processing, reset } = useForm({
    email: resource.email || '',
    password: '',
    password_confirmation: '',
    current_password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put('/users', {
      onSuccess: () => reset('password', 'password_confirmation', 'current_password'),
    });
  };

  return (
    <MainLayout title="Edit Account | Test Project">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Account</h1>
          
          {errors && errors.length > 0 && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <ul>
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
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                New Password <span className="text-gray-500 font-normal">(leave blank if you don't want to change it)</span>
              </label>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm New Password
              </label>
              <input
                id="password_confirmation"
                type="password"
                value={data.password_confirmation}
                onChange={(e) => setData('password_confirmation', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-2">
                Current Password <span className="text-gray-500 font-normal">(required to confirm your changes)</span>
              </label>
              <input
                id="current_password"
                type="password"
                value={data.current_password}
                onChange={(e) => setData('current_password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#3D2D1C] text-white py-2 px-4 rounded-md hover:bg-[#4E3D2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D2D1C] disabled:opacity-75"
              >
                {processing ? 'Saving changes...' : 'Update account'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <a href="/" className="text-blue-600 hover:underline font-medium">
              Back to home
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditAccount; 