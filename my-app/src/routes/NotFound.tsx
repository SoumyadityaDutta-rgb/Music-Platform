import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-primary flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Page not found</p>
      <Link 
        to="/" 
        className="flex items-center bg-spotify-green text-black px-6 py-3 rounded-full hover:scale-105 transition"
      >
        <FontAwesomeIcon icon={faHome} className="mr-2" />
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound; 