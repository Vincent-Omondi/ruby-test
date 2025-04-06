import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PropTypes from 'prop-types';

const Navbar = ({ auth = { user: null } }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  // Make sure auth and auth.user don't throw errors if they're null/undefined
  const isAuthenticated = auth && auth.user;
  
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
              <Link 
                href="/places" 
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                Places
              </Link>
              <Link 
                href="/ubuntu" 
                className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
              >
                Ubuntu
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
            </div>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
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
                    href="/users/sign_in" 
                    className="text-white hover:text-gray-300 px-3 py-2 text-sm font-medium"
                  >
                    Log in
                  </a>
                  <a 
                    href="/users/sign_up" 
                    className="bg-white text-[#3D2D1C] hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
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
          <Link 
            href="/places" 
            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Places
          </Link>
          <Link 
            href="/ubuntu" 
            className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
          >
            Ubuntu
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
        </div>
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
                  href="/users/sign_in" 
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Log in
                </a>
                <a 
                  href="/users/sign_up" 
                  className="ml-4 bg-white text-[#3D2D1C] hover:bg-gray-200 px-4 py-2 rounded-md text-sm font-medium"
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