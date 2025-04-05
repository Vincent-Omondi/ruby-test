import React, { useState } from 'react';
import { useForm, Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';

const Login = () => {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post('/users/sign_in', {
      onSuccess: () => reset('password'),
    });
  };

  return (
    <MainLayout title="Log In | Test Project">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
          
          {errors.email && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{errors.email}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
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
                autoFocus
              />
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="/users/password/new" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={data.password}
                onChange={(e) => setData('password', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#3D2D1C] focus:border-transparent"
                required
              />
            </div>
            
            <div className="mb-6 flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={data.remember}
                onChange={(e) => setData('remember', e.target.checked)}
                className="h-4 w-4 text-[#3D2D1C] focus:ring-[#3D2D1C] border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={processing}
                className="w-full bg-[#3D2D1C] text-white py-2 px-4 rounded-md hover:bg-[#4E3D2C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D2D1C] disabled:opacity-75"
              >
                {processing ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <a href="/users/sign_up" className="text-blue-600 hover:underline font-medium">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login; 