// tags.js in the routes directory

import express from 'express';
import Tag from '../models/tag';

const router = express.Router();

// POST /tags - Create a new tag
router.post('/tags', async (req, res) => {
  try {
    const tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /tags - Retrieve all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
