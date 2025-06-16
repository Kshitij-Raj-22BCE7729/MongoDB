import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
});

export const getRecipes = async () => {
  const response = await api.get('/recipes');
  return response.data;
};

export const getRecipe = async (id) => {
  const response = await api.get(`/recipes/${id}`);
  return response.data;
};

export const createRecipe = async (recipeData) => {
  const response = await api.post('/recipes', recipeData);
  return response.data;
};

export const updateRecipe = async (id, recipeData) => {
  const response = await api.put(`/recipes/${id}`, recipeData);
  return response.data;
};

export const deleteRecipe = async (id) => {
  const response = await api.delete(`/recipes/${id}`);
  return response.data;
};
