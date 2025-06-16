const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Recipe = require('../models/Recipe');

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../client/public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// GET single recipe
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// POST a new recipe with image
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      servings,
      cookingTime
    } = req.body;

    // Parse array fields if they're stringified
    const ingredients = typeof req.body.ingredients === 'string'
      ? JSON.parse(req.body.ingredients)
      : req.body.ingredients;

    const instructions = typeof req.body.instructions === 'string'
      ? JSON.parse(req.body.instructions)
      : req.body.instructions;

    const tags = typeof req.body.tags === 'string'
      ? JSON.parse(req.body.tags)
      : req.body.tags;

    const imageUrl = req.file
      ? `/uploads/${req.file.filename}`
      : 'https://via.placeholder.com/300';

    const newRecipe = new Recipe({
      title,
      description,
      category,
      difficulty,
      servings,
      cookingTime,
      ingredients,
      instructions,
      tags,
      image: imageUrl,
    });

    const saved = await newRecipe.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(500).json({
      error: 'Server error while creating recipe',
      details: err.message
    });
  }
});

// PUT update recipe with optional image
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      difficulty,
      servings,
      cookingTime
    } = req.body;

    const ingredients = typeof req.body.ingredients === 'string'
      ? JSON.parse(req.body.ingredients)
      : req.body.ingredients;

    const instructions = typeof req.body.instructions === 'string'
      ? JSON.parse(req.body.instructions)
      : req.body.instructions;

    const tags = typeof req.body.tags === 'string'
      ? JSON.parse(req.body.tags)
      : req.body.tags;

    const updateData = {
      title,
      description,
      category,
      difficulty,
      servings,
      cookingTime,
      ingredients,
      instructions,
      tags,
    };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updated = await Recipe.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!updated) return res.status(404).json({ msg: 'Recipe not found' });

    res.json(updated);
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).json({
      error: 'Server error while updating recipe',
      details: err.message
    });
  }
});

// DELETE a recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ msg: 'Recipe not found' });

    await recipe.deleteOne();
    res.json({ msg: 'Recipe removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
