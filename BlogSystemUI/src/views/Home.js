import React from "react";
import Header from "../components/Header";

function Home() {
  // Function to handle sign out (you might want to clear authentication tokens or states)

  return (
    <div>
        <Header />
        <h1>Welcome to the Home Page!</h1>
        <p>This is a basic home page component for your application.</p>

        {/* Example sign-out button */}
    </div>
  );
}

export default Home;
