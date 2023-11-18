// posts.js in the routes directory

import express from 'express';
import Post from '../models/posts.js';
import authenticate from '../middleware/authenticate.js';
import Tag from '../models/tags.js'
import Category from '../models/categories.js';

const router = express.Router();



router.post('/posts', authenticate, async (req, res) => {
  try {
    // Handle tags
    const tagIds = req.body.tags && Array.isArray(req.body.tags) ? 
      await Promise.all(req.body.tags.map(async (name) => {
        let tag = await Tag.findOne({ name });
        if (!tag) {
          tag = new Tag({ name });
          await tag.save();
        }
        return tag._id;
      })) : [];

    // Handle categories
    const categoryIds = req.body.categories && Array.isArray(req.body.categories) ? 
      await Promise.all(req.body.categories.map(async (name) => {
        let category = await Category.findOne({ name });
        if (!category) {
          category = new Category({ name });
          await category.save();
        }
        return category._id;
      })) : [];

    // Create new post with both tags and categories
    const post = new Post({ 
      ...req.body, 
      author: req.user._id, 
      tags: tagIds,
      categories: categoryIds
    });

    await post.save();

    // Populate the post with category and tag details
    const populatedPost = await Post.findById(post._id)
      .populate('categories', 'name') // Populate categories with their names
      .populate('tags', 'name'); // Populate tags with their names

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('categories', 'name') // Populate category names
      .populate('tags', 'name')      // Populate tag names
      .populate('author', 'username'); 

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE /posts/:id - Delete a post by ID
router.delete('/posts/:id', authenticate, async (req, res) => {
  try {
    const result = await Post.deleteOne({ _id: req.params.id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// GET /posts/:id - Retrieve a single post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('categories', 'name')  // Populate category names
      .populate('tags', 'name')         // Populate tag names
      .populate('author', 'username');  // Populate author username
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// PUT /posts/:id - Update a post by ID
router.put('/posts/:id', authenticate, async (req, res) => {
  try {
    // Convert category names to ObjectIds
    const categoryIds = await Promise.all(
      (req.body.categories || []).map(async (name) => {
        const category = await Category.findOne({ name });
        if (!category) {
          // Handle non-existent category (e.g., create a new category, throw an error, etc.)
          console.log(`Category not found: ${name}`);
          // For example, return null or throw an error
          return null;
        }
        return category._id;
      })
    );

    // Convert tag names to ObjectIds
    const tagIds = await Promise.all(
      (req.body.tags || []).map(async (name) => {
        const tag = await Tag.findOne({ name });
        if (!tag) {
          // Handle non-existent tag
          console.log(`Tag not found: ${name}`);
          // For example, return null or throw an error
          return null;
        }
        return tag._id;
      })
    );

    // Filter out any null values
    const validCategoryIds = categoryIds.filter(id => id);
    const validTagIds = tagIds.filter(id => id);

    // Update the post
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, categories: validCategoryIds, tags: validTagIds },
      { new: true }
    )
    .populate('categories', 'name')
    .populate('tags', 'name')
    .populate('author', 'username');

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res.status(500).json({ message: error.message });
  }
});


export default router;
