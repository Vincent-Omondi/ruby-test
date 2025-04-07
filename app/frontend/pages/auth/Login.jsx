import React, { useEffect } from 'react';
import { useForm, Head } from '@inertiajs/react';
import MainLayout from '../../components/layouts/MainLayout';

const Login = ({ csrf_token, errors = [] }) => {
  // Debug component loading
  useEffect(() => {
    console.log('Login component loaded with errors:', errors);
  }, []);

  const { data, setData, processing, setData: setFormData } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting login form with data:', data);
    
    // Use traditional form submission instead of Inertia for more reliable auth
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/users/sign_in';
    form.style.display = 'none';
    
    // Add authenticity token
    const csrfInput = document.createElement('input');
    csrfInput.type = 'hidden';
    csrfInput.name = 'authenticity_token';
    csrfInput.value = csrf_token;
    form.appendChild(csrfInput);
    
    // Add email
    const emailInput = document.createElement('input');
    emailInput.type = 'hidden';
    emailInput.name = 'user[email]';
    emailInput.value = data.email;
    form.appendChild(emailInput);
    
    // Add password
    const passwordInput = document.createElement('input');
    passwordInput.type = 'hidden';
    passwordInput.name = 'user[password]';
    passwordInput.value = data.password;
    form.appendChild(passwordInput);
    
    // Add remember me
    if (data.remember) {
      const rememberInput = document.createElement('input');
      rememberInput.type = 'hidden';
      rememberInput.name = 'user[remember_me]';
      rememberInput.value = '1';
      form.appendChild(rememberInput);
    }
    
    // Submit the form
    document.body.appendChild(form);
    form.submit();
  };

  return (
    <MainLayout title="Log In | Test Project">
      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
          
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