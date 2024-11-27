import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/detail.css";

const Detail = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const fetchSessionData = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("donotopen"));
    if (dataFromLocalStorage && dataFromLocalStorage.id > 0) {
      setUserData(dataFromLocalStorage);
      setDeptData(dataFromLocalStorage.department);
      setIsLoggedIn(true);
      setIsAdmin(dataFromLocalStorage.department.id === 1);
    } else {
      navigate("/");
    }
  };

  const fetchDeptDetail = () => {
    axios.get('http://localhost:9191/departments/get/detail')
      .then(response => {
        if (response.status === 200) {
          setDeptData(response.data);
        } else {
          alert("Error fetching department details");
        }
      })
      .catch(error => alert('Error: ' + error.message));
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9191/handle/logout');
      setIsLoggedIn(false);
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      alert('Error during logout: ' + error.message);
    }
  };

  useEffect(() => {
    fetchSessionData();
    fetchDeptDetail();
  }, []);

  return (
    <div className="detail-container">
      <header className="detail-header">
        <h1>Academia ERP</h1>
        <nav>
          {isLoggedIn && <Link to="/profile" className="detail-link">Profile</Link>}
          {isLoggedIn && <Link to="/dashboard" className="detail-link">Dashboard</Link>}
          {isAdmin && <Link to="/adddepart" className="detail-link">Add Department</Link>}
          {isAdmin && <Link to="/updatedep" className="detail-link">Update Department</Link>}
          {isAdmin && <Link to="/deletedep" className="detail-link">Delete Department</Link>}
          {isAdmin && <Link to="/request" className="detail-link">Requests</Link>}
          {isAdmin && <Link to="/detail" className="detail-link">Departments</Link>}
          {isLoggedIn && <button onClick={handleLogout} className="logout-button">Logout</button>}
        </nav>
      </header>

      <main>
        <h2>Department Details</h2>
        <div className="department-details">
          {deptData.map((item, index) => (
            <div key={index} className="department-card">
              <h3>{item.name}</h3>
              <p><strong>Capacity:</strong> {item.capacity}</p>
              <p><strong>Strength:</strong> {item.strength}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Detail;
