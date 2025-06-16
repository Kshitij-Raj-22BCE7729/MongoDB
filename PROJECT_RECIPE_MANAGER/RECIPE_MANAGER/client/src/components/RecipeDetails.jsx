import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteRecipe } from '../services/api';

const RecipeDetail = ({ recipe }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await deleteRecipe(recipe._id);
        toast.success('Recipe deleted successfully!');
        navigate('/');
      } catch (error) {
        toast.error(error.response?.data?.msg || 'Error deleting recipe');
      }
    }
  };

  if (!recipe) return null;

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">{recipe.title}</h1>
            <div className="flex space-x-2">
              <Link 
                to={`/edit-recipe/${recipe._id}`} 
                className="bg-yellow-500 text-gray-900 py-1 px-3 rounded-md hover:bg-yellow-600"
              >
                Edit
              </Link>
              <button 
                onClick={handleDelete} 
                className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
          
          <p className="text-gray-300 mb-6">{recipe.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Cooking Time</p>
              <p className="font-medium text-yellow-400">{recipe.cookingTime} min</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Difficulty</p>
              <p className="font-medium text-yellow-400">{recipe.difficulty}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Servings</p>
              <p className="font-medium text-yellow-400">{recipe.servings}</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-400">Category</p>
              <p className="font-medium text-yellow-400">{recipe.category}</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-yellow-400 mb-3">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-center">
                  <div className="h-2 w-2 bg-yellow-500 rounded-full mr-2"></div>
                  <span className="text-gray-200">
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold text-yellow-400 mb-3">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-yellow-500 text-gray-900 rounded-full">
                      {instruction.step}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-200">{instruction.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-yellow-400 mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="bg-gray-800 text-yellow-300 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;