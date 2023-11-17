import axios from 'axios';

const API_URL = 'http://localhost:4000/'; // Your API base URL

const register = (username, email, password) => {
  return axios.post(API_URL + 'users', {
    username,
    email,
    password,
  });
};

const login = (username, email, password) => {
    return axios.post(API_URL + 'login', {
      username,
      email,
      password,
    });
  };

export default {
  register, login,
};
