import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            {/* Chef Hat SVG Icon */}
            <svg
              className="w-8 h-8 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M48,22c0-5.523-4.477-10-10-10c-1.848,0-3.576,0.506-5.069,1.39C30.862,10.772,28.48,10,26,10c-6.627,0-12,5.373-12,12 c0,2.451,0.746,4.724,2.021,6.604C14.798,29.646,12,33.529,12,38v2c0,1.105,0.895,2,2,2h36c1.105,0,2-0.895,2-2v-2 c0-4.471-2.798-8.354-6.021-9.396C47.254,26.724,48,24.451,48,22z" />
              <rect x="20" y="44" width="24" height="6" rx="2" />
              <rect x="22" y="50" width="20" height="4" rx="1" />
            </svg>
            <span className="text-xl font-bold text-yellow-300">Recipe Manager</span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-200 hover:text-yellow-400">
              Home
            </Link>
            <Link
              to="/add-recipe"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 py-2 px-4 rounded-lg font-semibold"
            >
              Add Recipe
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
