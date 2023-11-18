import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

function PostCreationForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
 // const [author, setAuthor] = useState(''); 
  const [tags, setTags] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const resetForm = () => {
    setTitle('');
    setContent('');
   // setAuthor('');
    setCategory('');
    setTags('');
  };

  const validateForm = () => {
    if (!title || !content || !category) {
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
        const categoryArray = category.split(',').map(cat => cat.trim()); 
        const newPost = { title, content, category: categoryArray, tags: tagArray }; 

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
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      <div className="container mt-5">  
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
          <label htmlFor="postCategory" className="form-label">Category</label>
          <input 
            type="text" 
            className="form-control" 
            id="postCategory"
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            placeholder="Enter the category of the post" 
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
