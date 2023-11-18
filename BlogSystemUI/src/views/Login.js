import React, { useState } from "react";
import authService from "../services/authService"; 
import { useNavigate } from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    let newErrors = {};

    if (!username.trim()) {
      isValid = false;
      newErrors.username = "Username is required";
    }

    if (!email.trim()) {
      isValid = false;
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      isValid = false;
      newErrors.email = "Email is not valid";
    }

    if (!password) {
      isValid = false;
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoginError(""); 

    if (validateForm()) {
      authService.login(username, email, password)
        .then(response => {
          console.log('Login successful', response.data);
          navigate('/Home'); // Navigate to home page
        })
        .catch(error => {
          // Handle login errors here
          setLoginError("Login failed. Invalid username or password.");
          console.error('Login error', error.response.data);
        });
    }
  };
  


  return (
    <div className="container mt-5">  
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <h1 className="text-center pb-2">Login Form</h1>
          {loginError && <div className="alert alert-danger">{loginError}</div>}
          <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
            
            {/* Username Field */}
            <label className="form-label" htmlFor="formUsername">Username</label>
            <div className="form-outline mb-4">
              <input 
                type="text" 
                id="formUsername" 
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            {/* Email Field */}
            <label className="form-label" htmlFor="formEmail">Email address</label>
            <div className="form-outline mb-4">
              <input 
                type="email" 
                id="formEmail" 
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password Field */}
            <label className="form-label" htmlFor="formPassword">Password</label>
            <div className="form-outline mb-4">
              <input 
                type="password" 
                id="formPassword" 
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="formRememberMe"
                    // You may want to manage this state as well if needed
                  />
                  <label className="form-check-label" htmlFor="formRememberMe">
                    Remember me
                  </label>
                </div>
              </div>

              <div className="col">
                <a href="/Register">Register</a>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block">
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
