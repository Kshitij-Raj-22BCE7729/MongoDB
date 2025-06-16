import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-gray-900 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-yellow-500">
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-yellow-400 mb-2">{recipe.title}</h3>
        <div className="flex items-center justify-between text-sm text-yellow-300 mb-3">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {recipe.cookingTime} min
          </span>
          <span className="px-2 py-1 bg-yellow-900 text-yellow-300 rounded-full">{recipe.difficulty}</span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            {recipe.servings}
          </span>
        </div>
        <p className="text-yellow-200 mb-4 line-clamp-2">{recipe.description}</p>
        <div className="flex justify-between items-center">
          <span className="bg-yellow-700 text-black text-xs px-2 py-1 rounded-full">{recipe.category}</span>
          <Link 
            to={`/recipe/${recipe._id}`}
            className="text-yellow-400 hover:text-yellow-200 font-medium"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;