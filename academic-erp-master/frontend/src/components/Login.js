import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../css/Login.css';

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9191/handle/login", {
      email: data.email,
      password: data.password,
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("donotopen", JSON.stringify(response.data));
          alert("Login successful.");
          navigate("/dashboard");
        } else {
          alert("Login failed. Please try again.");
        }
      })
      .catch((error) => {
        alert('Error: ' + (error.response ? error.response.data : error.message));
      });
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Academia ERP</h1>
      </header>

      <main className="login-main">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </main>
    </div>
  );
}

export default Login;
