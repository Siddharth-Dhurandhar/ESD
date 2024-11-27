import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/profile.css'; // Import the new CSS file

function Profile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [deptData, setDeptData] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const fetchSessionData = () => {
    const dataFromLocalStorage = JSON.parse(localStorage.getItem("donotopen"));
    if (dataFromLocalStorage && dataFromLocalStorage.id) {
      setUserData(dataFromLocalStorage);
      setDeptData(dataFromLocalStorage.department);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:9191/handle/logout');
      if (response.status === 200) {
        setIsLoggedIn(false);
        localStorage.clear();
        navigate("/login");
      } else {
        alert("Error logging out. Please try again!");
      }
    } catch (error) {
      alert('Error: ' + (error.response ? error.response.data : error.message));
    }
  };

  useEffect(() => {
    fetchSessionData();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Academia ERP</h1>
      </header>
      <main>
        <h2>My Profile</h2>
        {isLoggedIn && (
          <div className="profile-card">
            <div className="profile-item">
              <label>Name</label>
              <p>{userData.first_name} {userData.last_name}</p>
            </div>
            <div className="profile-item">
              <label>Email</label>
              <p>{userData.email}</p>
            </div>
            <div className="profile-item">
              <label>Title</label>
              <p>{userData.title}</p>
            </div>
            <div className="profile-item">
              <label>Department</label>
              <p>{deptData.name}</p>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Profile;
