import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const MapDisplay = ({ places = [], className = '' }) => {
  const [mapInitialized, setMapInitialized] = useState(false);
  
  useEffect(() => {
    // Load Leaflet CSS
    const linkEl = document.createElement('link');
    linkEl.rel = 'stylesheet';
    linkEl.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    linkEl.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    linkEl.crossOrigin = '';
    document.head.appendChild(linkEl);
    
    // Load Leaflet JS
    const scriptEl = document.createElement('script');
    scriptEl.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    scriptEl.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
    scriptEl.crossOrigin = '';
    
    scriptEl.onload = () => {
      setMapInitialized(true);
    };
    
    document.body.appendChild(scriptEl);
    
    return () => {
      document.head.removeChild(linkEl);
      document.body.removeChild(scriptEl);
    };
  }, []);
  
  useEffect(() => {
    if (!mapInitialized || !places.length) return;
    
    // Default center (can be calculated from places)
    const defaultLat = -1.292;
    const defaultLng = 36.821;
    
    // Initialize map
    const L = window.L;
    const mapEl = document.getElementById('map');
    
    // Create map instance
    const map = L.map(mapEl).setView([defaultLat, defaultLng], 13);
    
    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add markers for each place
    places.forEach(place => {
      const marker = L.marker([place.latitude, place.longitude]).addTo(map);
      marker.bindPopup(`
        <strong>${place.name}</strong><br>
        ${place.description}<br>
        <em>Added by: ${place.created_by.name}</em>
      `);
    });
    
    // Clean up
    return () => {
      map.remove();
    };
  }, [mapInitialized, places]);
  
  return (
    <div className={`bg-blue-50 relative min-h-[400px] flex items-center justify-center ${className}`}>
      <div id="map" className="absolute inset-0"></div>
      {!mapInitialized && (
        <div className="text-center p-8 z-10 bg-white/80 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 mx-auto text-blue-400 mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" 
            />
          </svg>
          <h3 className="text-xl font-medium text-blue-900 mb-2">Loading Map...</h3>
          <p className="text-blue-600">
            Please wait while we load the interactive map.
          </p>
        </div>
      )}
    </div>
  );
};

MapDisplay.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    created_by: PropTypes.shape({
      name: PropTypes.string
    })
  })),
  className: PropTypes.string,
};

export default MapDisplay; 