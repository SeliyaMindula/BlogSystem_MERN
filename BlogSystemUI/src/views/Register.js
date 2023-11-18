import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import authService from "../services/authService";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const handleLoginRedirect = () => {
    navigate('/'); 
  };
  const validateForm = () => {
    let formIsValid = true;
    let errors = {};

    if (!username) {
      formIsValid = false;
      errors["username"] = "Please enter your username.";
    }

    if (!email) {
      formIsValid = false;
      errors["email"] = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formIsValid = false;
      errors["email"] = "Email is not valid.";
    }

    if (!password) {
      formIsValid = false;
      errors["password"] = "Please enter your password.";
    } else if (password.length < 6) {
      formIsValid = false;
      errors["password"] = "Password must be at least 6 characters.";
    }

    if (password !== confirmPassword) {
      formIsValid = false;
      errors["confirmPassword"] = "Passwords do not match.";
    }

    setErrors(errors);
    return formIsValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      authService
        .register(username, email, password)
        .then((response) => {
          setSuccessMessage("Registration successful! You can now login.");
          setUsername("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((error) => {
          console.error("Registration error", error.response.data);
        });
    }
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
          

          <form onSubmit={handleSubmit} className="p-4 border rounded bg-white">
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
            {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger" role="alert">
              {Object.values(errors).map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>
            <div className="text-center mt-3">
        <button onClick={handleLoginRedirect} className="btn btn-secondary">
          Go to Login
        </button>
      </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
