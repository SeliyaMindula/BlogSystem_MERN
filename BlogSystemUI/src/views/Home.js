import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import authService from "../services/authService";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    authService
      .getPosts()
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // Function to format the timestamp to display only date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <div>
      <Header />
      <div className="container">
        <h1 className="text-center my-4">Welcome to My Blog Page!</h1>
        <p className="text-center">Explore the latest posts below.</p>
  
        {posts.map((post) => (
          <div className="col-md-12 col-lg-12 mt-5" key={post._id}>
            <div className="blog-card p-4">
              <h3 className="blog-title text-center mb-3">{post.title}</h3>
              <p className="blog-content">{post.content}</p>
  
              <div className="blog-categories">
                <strong>Categories:</strong>
                {post.categories && post.categories.length > 0 ? (
                  post.categories.map((category, index) => (
                    <span className="badge" key={category._id}>
                      {category.name}
                    </span>
                  ))
                ) : (
                  <span className="no-data">No categories</span>
                )}
              </div>
  
              <div className="blog-tags">
                <strong>Tags:</strong>
                {post.tags && post.tags.length > 0 ? (
                  post.tags.map((tag, index) => (
                    <span className="badge" key={tag._id}>
                      {tag.name}
                    </span>
                  ))
                ) : (
                  <span className="no-data">No tags</span>
                )}
              </div>
  
              <div className="meta-style2 mt-3">
                <span>
                  <i className="fas fa-calendar-alt"></i> {formatTimestamp(post.createdAt)}
                </span>
                <span>
                  <i className="fas fa-user"></i> {post.author.username}
                </span>
              </div>
              {/* <button className="btn btn-primary me-2" onClick={() => handleUpdate(post._id)}>Update</button>
              <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>Delete</button> */}
              <button className="btn btn-primary me-2" >Update</button>
              <button className="btn btn-danger" >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
