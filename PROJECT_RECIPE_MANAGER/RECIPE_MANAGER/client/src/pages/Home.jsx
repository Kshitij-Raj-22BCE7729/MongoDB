import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../services/api';
import RecipeCard from '../components/RecipeCard';
import SearchBar from '../components/SearchBar';

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchRecipes();
  }, []);
  
  const handleSearch = (searchTerm, filterCategory) => {
    let results = recipes;
    
    if (searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) ||
        recipe.description.toLowerCase().includes(searchTerm) ||
        recipe.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filterCategory) {
      results = results.filter(recipe => recipe.category === filterCategory);
    }
    
    setFilteredRecipes(results);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
      </div>
    );
  }
  
  const categories = [...new Set(recipes.map(recipe => recipe.category))];
  
  return (
    <div className="min-h-screen bg-gray-900">
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-yellow-400">My Recipes</h1>
        <Link
          to="/add-recipe"
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-lg flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add New Recipe
        </Link>
      </div>
      
      <SearchBar onSearch={handleSearch} categories={categories} />
      
      {filteredRecipes.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl text-yellow-300">No recipes found</h3>
          <p className="text-yellow-200 mt-2">Try adjusting your search or add a new recipe</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {filteredRecipes.map(recipe => (
            <RecipeCard key={recipe._id} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
