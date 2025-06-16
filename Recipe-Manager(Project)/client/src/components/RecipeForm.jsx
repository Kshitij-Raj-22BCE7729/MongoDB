import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createRecipe, updateRecipe } from '../services/api';

const RecipeForm = ({ recipe = null }) => {
  const isEditing = !!recipe;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: recipe?.title || '',
    description: recipe?.description || '',
    ingredients: recipe?.ingredients || [{ name: '', quantity: '', unit: '' }],
    instructions: recipe?.instructions || [{ step: 1, description: '' }],
    cookingTime: recipe?.cookingTime || '',
    difficulty: recipe?.difficulty || 'Medium',
    servings: recipe?.servings || '',
    category: recipe?.category || '',
    tags: recipe?.tags?.join(', ') || '',
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][field] = value;
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: '', quantity: '', unit: '' }],
    });
  };

  const removeIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  const handleInstructionChange = (index, field, value) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions[index][field] = value;
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const addInstruction = () => {
    setFormData({
      ...formData,
      instructions: [
        ...formData.instructions,
        { step: formData.instructions.length + 1, description: '' },
      ],
    });
  };

  const removeInstruction = (index) => {
    const updatedInstructions = [...formData.instructions];
    updatedInstructions.splice(index, 1);
    updatedInstructions.forEach((instruction, i) => {
      instruction.step = i + 1;
    });
    setFormData({ ...formData, instructions: updatedInstructions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    for (let key in formData) {
      if (key === 'tags') {
        payload.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim())));
      } else if (key === 'ingredients' || key === 'instructions') {
        payload.append(key, JSON.stringify(formData[key]));
      } else {
        payload.append(key, formData[key]);
      }
    }
    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      if (isEditing) {
        await updateRecipe(recipe._id, payload);
        toast.success('Recipe updated!');
      } else {
        await createRecipe(payload);
        toast.success('Recipe created!');
      }
      navigate('/');
    } catch {
      toast.error('Something went wrong');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-gray-900 p-6 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-yellow-400">Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-400">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
          />
          {imageFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-400">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <label className="block text-sm font-medium text-yellow-400">Cooking Time (minutes)</label>
          <input
            type="number"
            name="cookingTime"
            value={formData.cookingTime}
            onChange={handleChange}
            className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-400">Difficulty</label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
          >
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-400">Servings</label>
          <input
            type="number"
            name="servings"
            value={formData.servings}
            onChange={handleChange}
            className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-yellow-400">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-yellow-400">Tags (comma separated)</label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-yellow-400">Ingredients</label>
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center text-sm text-yellow-400 hover:text-yellow-300"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Ingredient
          </button>
        </div>
        {formData.ingredients.map((ingredient, idx) => (
          <div key={idx} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(idx, 'name', e.target.value)}
              placeholder="Ingredient name"
              className="flex-grow border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
            <input
              type="text"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(idx, 'quantity', e.target.value)}
              placeholder="Quantity"
              className="w-24 border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
            <input
              type="text"
              value={ingredient.unit}
              onChange={(e) => handleIngredientChange(idx, 'unit', e.target.value)}
              placeholder="Unit"
              className="w-24 border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
            />
            {formData.ingredients.length > 1 && (
              <button
                type="button"
                onClick={() => removeIngredient(idx)}
                className="text-yellow-400 hover:text-yellow-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-yellow-400">Instructions</label>
          <button
            type="button"
            onClick={addInstruction}
            className="flex items-center text-sm text-yellow-400 hover:text-yellow-300"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Step
          </button>
        </div>
        {formData.instructions.map((instruction, idx) => (
          <div key={idx} className="flex items-start space-x-2 mb-2">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-yellow-400 text-black font-bold">
              {instruction.step}
            </div>
            <textarea
              value={instruction.description}
              onChange={(e) => handleInstructionChange(idx, 'description', e.target.value)}
              placeholder="Instruction details"
              rows="2"
              className="flex-grow border border-yellow-400 bg-gray-900 text-yellow-100 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-yellow-400 focus:border-yellow-400"
              required
            />
            {formData.instructions.length > 1 && (
              <button
                type="button"
                onClick={() => removeInstruction(idx)}
                className="text-yellow-400 hover:text-yellow-600"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => navigate('/')}
          className="mr-2 bg-yellow-400 py-2 px-4 border border-yellow-400 rounded-md shadow-sm text-sm font-medium text-black hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-gray-900 py-2 px-4 border border-yellow-400 rounded-md shadow-sm text-sm font-medium text-yellow-400 hover:bg-yellow-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
        >
          {isEditing ? 'Update Recipe' : 'Add Recipe'}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;
