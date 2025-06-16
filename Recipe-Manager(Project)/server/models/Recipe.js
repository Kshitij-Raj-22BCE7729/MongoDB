const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String },
  difficulty: { type: String, required: true },
  servings: { type: Number, required: true },
  cookingTime: { type: Number, required: true },
  ingredients: { type: Array, required: true },
  instructions: { type: Array, required: true },
  tags: { type: Array }, // New field
  image: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
