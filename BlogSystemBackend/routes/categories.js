// categories.js in the routes directory

import express from 'express';
import Category from '../models/categories.js'; // Adjust the path as necessary for your project structure

const router = express.Router();

// POST /categories - Create a new category
router.post('/categories', async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /categories - Retrieve all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
