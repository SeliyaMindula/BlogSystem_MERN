import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import both Link and useNavigate from react-router-dom
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext'; // Assuming you have an AuthContext

function Header() {

  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext); // Assuming your context provides a setter for auth data

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setAuthData(null);
    navigate('/');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/Home">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/Home">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Addpost">Add post</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleSignOut} className="nav-link btn btn-link" style={{ cursor: 'pointer' }}>Log out</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
