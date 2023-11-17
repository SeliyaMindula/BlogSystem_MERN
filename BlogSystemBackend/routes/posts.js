// posts.js in the routes directory

import express from 'express';
import Post from '../models/posts.js';
import authenticate from '../middleware/authenticate.js'; // Assuming you have authentication middleware

const router = express.Router();

// POST /posts - Create a new post (authentication required)
router.post('/posts', authenticate, async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user._id });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /posts - Retrieve all posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('author');
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /posts/:id - Retrieve a single post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author');
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
