import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/addDept.css";

const AddDepartment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState({
    name: '',
    capacity: '',
    password: '',
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const fetchSessionData = () => {
    const storedData = localStorage.getItem("donotopen");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setUserData(parsedData);
      setIsAdmin(parsedData.department?.id === 1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify password first
      const loginResponse = await axios.post("http://localhost:9191/handle/login", {
        email: userData.email,
        password: data.password,
      });

      if (loginResponse.status === 200) {
        // Add department if password verification succeeds
        const addDeptResponse = await axios.post("http://localhost:9191/departments/add", {
          name: data.name,
          capacity: data.capacity,
        });

        if (addDeptResponse.status === 200) {
          alert("Department added successfully!");
          navigate("/dashboard");
        }
      }
    } catch (error) {
      alert(error.response?.data || "Something went wrong!");
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Add Department</h1>
        <nav>
          <button onClick={() => navigate("/dashboard")} className="dashboard-link">Back to Dashboard</button>
        </nav>
      </header>

      <main>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Department Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter department name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              placeholder="Enter capacity"
              value={data.capacity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Add Department
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddDepartment;
