import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import Header from '../components/Header';

function UpdatePost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState('');
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    authService.getPost(postId)
      .then(response => {
        const { title, content, categories, tags } = response.data;
        setTitle(title);
        setContent(content);
        setCategories(categories.map(cat => cat.name).join(', ')); // Assuming categories is an array of objects
        setTags(tags.map(tag => tag.name).join(', ')); // Assuming tags is an array of objects
      })
      .catch(error => {
        console.error("Error fetching post data:", error);
      });
  }, [postId]);

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
      const updatedPost = { title, content, categories: categoryArray, tags: tagArray };

      authService.updatePost(postId, updatedPost)
        .then(() => {
          setSuccessMessage('Post updated successfully!');
          navigate('/Home'); // or wherever you wish to redirect the user
        })
        .catch(error => {
          setErrorMessage(error.response?.data?.message || 'Error updating post');
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2 className='text-center pt-4'>Update Your Post</h2>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="mb-3 p-4 border rounded">
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
          <button type="submit" className="btn btn-primary">Update Post</button>
        </form>
      </div>
    </>
  );
}

export default UpdatePost;
