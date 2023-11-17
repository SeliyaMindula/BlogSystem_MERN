import React from 'react';

function Home() {
  // Function to handle sign out (you might want to clear authentication tokens or states)
  const handleSignOut = () => {
    // Clear user authentication details (like tokens from localStorage/sessionStorage/cookies)
    // Redirect to login page or change the application state as needed
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <p>This is a basic home page component for your application.</p>
      
      {/* Example sign-out button */}
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default Home;
