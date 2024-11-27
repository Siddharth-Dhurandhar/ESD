import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/home.css";

function Home() {
  const navigate = useNavigate();

  // Redirects the user to the dashboard if the "donotopen" key exists in localStorage.
  useEffect(() => {
    if (localStorage.getItem("donotopen") !== null) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Academic ERP</h1>
        <p className="home-subtitle">This is the home page. Please log in or sign up to continue.</p>
      </header>

      <main className="home-main">
        <div className="home-buttons">
          <button
            className="home-button login-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
          <button
            className="home-button signup-button"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
