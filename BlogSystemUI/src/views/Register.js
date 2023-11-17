import React, { useState } from "react";
import authService from "../services/authService";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    authService
      .register(username, email, password)
      .then((response) => {
        // Set the success message
        setSuccessMessage("Registration successful! You can now login.");
        // Clear the form (optional)
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        // Handle errors here
        console.error("Registration error", error.response.data);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center pb-2">Register Form</h1>
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

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
                Username
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

            <div className="form-outline mb-4">
              <input
                type="password"
                id="formConfirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className="form-label" htmlFor="formConfirmPassword">
                Confirm Password
              </label>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
