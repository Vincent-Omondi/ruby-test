import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

const Navbar = ({ auth = { user: null } }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Debug output to see what auth data is received
  useEffect(() => {
    console.log('Navbar received auth:', auth);
  }, [auth]);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Check if user is authenticated - user object must have an id and email
  const isAuthenticated = auth && auth.user && auth.user.id && auth.user.email;
  
  return (
    <nav className="bg-[#3D2D1C] text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-xl font-bold">TEST PROJECT</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {/* Common Links for All Users */}
              <Link 
                href="/" 
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                About us
              </Link>
              <Link 
                href="/blog" 
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                Blog
              </Link>
              
              {/* Authenticated User Links */}
              {isAuthenticated ? (
                <>
                  <Link 
                    href="/places/new" 
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                  >
                    Add Location
                  </Link>
                  <Link 
                    href="/my-places" 
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                  >
                    My Places
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    href="/people" 
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                  >
                    People
                  </Link>
                  <Link 
                    href="/projects" 
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                  >
                    Projects
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <span className="bg-[#4E3D2C] text-white px-4 py-2 rounded-md text-sm font-medium">
                    {auth.user.email}
                  </span>
                  <Link 
                    href="/users/sign_out"
                    method="delete"
                    as="button"
                    type="button"
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                  >
                    Sign out
                  </Link>
                </div>
              ) : (
                <>
                  <a 
                    href="#"
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/users/sign_in';
                    }}
                  >
                    Log in
                  </a>
                  <a 
                    href="#"
                    className="bg-white text-[#3D2D1C] hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = '/users/sign_up';
                    }}
                  >
                    Sign up
                  </a>
                </>
              )}
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-200 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
            >
              <svg 
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg 
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {/* Common mobile links */}
          <Link 
            href="/" 
            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </Link>
          <Link 
            href="/about" 
            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            About us
          </Link>
          <Link 
            href="/blog" 
            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Blog
          </Link>
          
          {/* Authenticated user mobile links */}
          {isAuthenticated ? (
            <>
              <Link 
                href="/places/new" 
                className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                Add Location
              </Link>
              <Link 
                href="/my-places" 
                className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                My Places
              </Link>
            </>
          ) : (
            <>
              <Link 
                href="/people" 
                className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                People
              </Link>
              <Link 
                href="/projects" 
                className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                Projects
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile auth section */}
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            {isAuthenticated ? (
              <div className="flex flex-col space-y-2 w-full">
                <span className="text-white text-sm">Hello, {auth.user.email}</span>
                <Link 
                  href="/users/sign_out"
                  method="delete"
                  as="button"
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign out
                </Link>
              </div>
            ) : (
              <>
                <a 
                  href="#"
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/users/sign_in';
                  }}
                >
                  Log in
                </a>
                <a 
                  href="#"
                  className="ml-4 bg-white text-[#3D2D1C] hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/users/sign_up';
                  }}
                >
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object
};

export default Navbar; 