import axios from 'axios';

const API_URL = 'http://localhost:4000/'; // Your API base URL

const register = (username, email, password) => {
  return axios.post(API_URL + 'users', {
    username,
    email,
    password,
  });
};

// const login = (username, email, password) => {
//     return axios.post(API_URL + 'login', {
//       username,
//       email,
//       password,
//     });
//   };

const login = (username, email, password) => {
  return axios.post(API_URL + 'login', {
    username,
    email,
    password,
  }).then(response => {
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response; 
  }).catch(error => {
    console.error("Login error:", error);
    throw error; 
  });
};


  const createPost = (postData) => {
    const token = localStorage.getItem('token'); 
    return axios.post(API_URL + 'posts', postData, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
  };

  const getPosts = () => {
    const token = localStorage.getItem('token'); 
    return axios.get(API_URL + 'posts', {
      headers: {
        Authorization: `Bearer ${token}` 
      },
    });
  };
  

export default {
  register, login, createPost, getPosts,
};
