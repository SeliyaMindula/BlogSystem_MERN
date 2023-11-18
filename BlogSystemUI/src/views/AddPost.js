import React, { useState } from 'react';
import authService from '../services/authService';
import Header from '../components/Header';

function PostCreationForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState(''); // Renamed to categories
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategories('');
    setTags('');
  };

  const validateForm = () => {
    if (!title || !content || !categories) {
      setErrorMessage('Please fill in all fields');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const tagArray = tags.split(',').map(tag => tag.trim());
      const categoryArray = categories.split(',').map(cat => cat.trim()); 
      const newPost = { title, content, categories: categoryArray, tags: tagArray }; // Updated key to categories

      authService.createPost(newPost).then(response => {
        setSuccessMessage('Post created successfully!');
        resetForm();
        // navigate('/posts'); // Uncomment to navigate after post creation
      }).catch(error => {
        setErrorMessage(error.response?.data?.message || 'Error creating post');
      });
    }
  };

  return (
    <>
    <Header/>
    <h2 className='text-center pt-4'>Add Your Post</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="container mt-4">  
      <form onSubmit={handleSubmit} className="mb-3 p-4 border rounded bg-white">
        <div className="mb-3">
          <label htmlFor="postTitle" className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            id="postTitle"
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            placeholder="Enter the title of the post" 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postContent" className="form-label">Content</label>
          <textarea 
            className="form-control" 
            id="postContent" 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            placeholder="Enter the content of the post" 
          />
        </div>
        <div className="mb-3">
          <label htmlFor="postCategories" className="form-label">Categories</label>
          <input 
            type="text" 
            className="form-control" 
            id="postCategories"
            value={categories} 
            onChange={e => setCategories(e.target.value)} 
            placeholder="Enter categories, separated by commas" 
          />
        </div>
        {/* <div className="mb-3">
        <label htmlFor="postAuthor" className="form-label">Author</label>
        <input 
          type="text" 
          className="form-control" 
          id="postAuthor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          placeholder="Enter the author's ID" 
        />
      </div> */}
        <div className="mb-3">
          <label htmlFor="postTags" className="form-label">Tags</label>
          <input 
            type="text" 
            className="form-control" 
            id="postTags"
            value={tags} 
            onChange={e => setTags(e.target.value)} 
            placeholder="Enter tags, separated by commas" 
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Post</button>
      </form>
      </div>
    </>
  );
}

export default PostCreationForm;
