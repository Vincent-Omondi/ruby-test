import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import '../../styles/navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'People', href: '/people' },
    { name: 'Projects', href: '/projects' },
    { name: 'Places', href: '/places' },
    { name: 'Ubuntu', href: '/ubuntu' },
    { name: 'About us', href: '/about' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <nav className="bg-[#3D2D1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Area */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <span className="brand-text text-xl">TEST PROJECT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {/* Nav Links */}
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-gray-200 px-3 py-2 text-sm font-medium transition duration-150 ease-in-out"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center ml-6 space-x-4">
              <Link
                href="/login"
                className="text-white hover:text-gray-200 text-sm font-medium transition duration-150 ease-in-out"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[#3D2D1C] bg-white hover:bg-gray-200 transition duration-150 ease-in-out"
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 hover:bg-[#59442F] transition duration-150 ease-in-out"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#4A3824]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-white hover:bg-[#59442F] block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-[#59442F] bg-[#4A3824]">
            <div className="flex items-center px-5 space-x-4">
              <Link
                href="/login"
                className="text-white hover:bg-[#59442F] block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-2 text-center rounded-md text-[#3D2D1C] bg-white hover:bg-gray-200 text-base font-medium transition duration-150 ease-in-out w-full"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 