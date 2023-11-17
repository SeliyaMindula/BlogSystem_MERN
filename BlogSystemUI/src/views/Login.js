import React, { useState } from "react";
import authService from "../services/authService"; 

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    authService.login(username, email, password)
      .then(response => {
        // Handle successful login
        // You might want to save the token, navigate to another page, etc.
        console.log('Login successful', response.data);
      })
      .catch(error => {
        // Handle login errors here
        console.error('Login error', error.response.data);
      });
  };
  


  return (
    <div className="container mt-5">  
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <h1 className="text-center pb-2">Login Form</h1>

          <form onSubmit={handleSubmit} className="p-4 border rounded">
            
            <div className="form-outline mb-4">
              <input 
                type="text" 
                id="formUsername" 
                className="form-control" 
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
              />
              <label className="form-label" htmlFor="formUsername">
                User name
              </label>
            </div>

            <div className="form-outline mb-4">
              <input 
                type="email" 
                id="formEmail" 
                className="form-control" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
              />
              <label className="form-label" htmlFor="formEmail">
                Email address
              </label>
            </div>

            <div className="form-outline mb-4">
              <input 
                type="password" 
                id="formPassword" 
                className="form-control" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
              />
              <label className="form-label" htmlFor="formPassword">
                Password
              </label>
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
