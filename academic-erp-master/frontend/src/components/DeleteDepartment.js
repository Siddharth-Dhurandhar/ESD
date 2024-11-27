import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/deleteDept.css";

const DeleteDepartment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [alldepartments, setAllDepartments] = useState([]);
  const [data, setData] = useState({ department: 0, password: '' });

  const handleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value });
  };

  const fetchAllDepartments = () => {
    axios.get('http://localhost:9191/departments/get-all')
      .then(response => {
        if (response.status === 200) {
          setAllDepartments(response.data.filter(item => item.id !== 1 && item.id !== 7));
        } else {
          alert('Error fetching departments.');
        }
      })
      .catch(error => alert('Error: ' + error.message));
  };

  const fetchSessionData = () => {
    const storedData = JSON.parse(localStorage.getItem('donotopen'));
    if (storedData && storedData.id > 0) {
      setUserData(storedData);
      setIsAdmin(storedData.department.id === 1);
    } else {
      navigate('/');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9191/handle/login', {
      email: userData.email,
      password: data.password,
    })
    .then(response => {
      if (response.status === 200) {
        axios.delete(`http://localhost:9191/departments/delete/${data.department}`)
          .then(response => {
            if (response.status === 200) {
              alert('Department deleted.');
              navigate('/dashboard');
            } else {
              alert('Error deleting department.');
            }
          })
          .catch(error => alert('Error: ' + error.message));
      } else {
        alert('Incorrect login details.');
      }
    })
    .catch(error => {
      alert('Error: ' + error.message);
      navigate('/login');
    });
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9191/handle/logout');
      localStorage.clear();
      navigate('/login');
    } catch (error) {
      alert('Error logging out: ' + error.message);
    }
  };

  useEffect(() => {
    fetchSessionData();
    fetchAllDepartments();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Academia ERP</h1>
        <nav>
          <Link to="/profile" className="dashboard-link">Profile</Link>
          <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
          {isAdmin && <Link to="/adddepart" className="dashboard-link">Add Dept</Link>}
          {isAdmin && <Link to="/updatedep" className="dashboard-link">Update Dept</Link>}
          {isAdmin && <Link to="/deletedep" className="dashboard-link">Delete Dept</Link>}
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </nav>
      </header>
      
      <main>
        <h2>Delete Department</h2>
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label>Department:</label>
            <select name="department" onChange={handleChange} className="form-input" required>
              <option value="0" disabled>Select Department</option>
              {alldepartments.map(department => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="submit-button">Delete Department</button>
        </form>
      </main>
    </div>
  );
};

export default DeleteDepartment;
