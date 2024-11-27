import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from './helper-components/Footer';
import '../css/updateDept.css';

const UpdateDepartment = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [data, setData] = useState({ id: 0, name: '', capacity: '', password: '' });
  const [alldepartments, setAllDepartments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchAllDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:9191/departments/get-all');
      if (response.status === 200) {
        const filteredDepartments = response.data.filter(item => item.id !== 1 && item.id !== 7);
        setAllDepartments(filteredDepartments);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const fetchUserData = () => {
    const sessionData = JSON.parse(localStorage.getItem('donotopen'));
    if (sessionData && sessionData.id > 0) {
      setUserData(sessionData);
      setIsAdmin(sessionData.department.id === 1);
    } else {
      navigate('/');
    }
  };

  const fetchDeptData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:9191/departments/get/${id}`);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.error('Error fetching department data:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
    if (name === 'id' && value !== '0') fetchDeptData(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.id === '0' || data.id === 0) {
      alert('Please select a department');
      return;
    }

    try {
      const loginResponse = await axios.post('http://localhost:9191/handle/login', {
        email: userData.email,
        password: data.password
      });

      if (loginResponse.status === 200) {
        const updateResponse = await axios.put(`http://localhost:9191/departments/update/${data.id}`, {
          name: data.name,
          capacity: data.capacity
        });

        if (updateResponse.status === 200) {
          alert('Department successfully updated.');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Error during submit:', error);
      alert(error.response ? error.response.data : 'An error occurred');
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:9191/handle/logout');
      localStorage.clear();
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchAllDepartments();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <h1>Academia ERP</h1>
      </header>

      <div className="page-wrap">
        <div className="page-wrapper">
          <div className="primary-content">
            <div className="mid-panel">
              <h2>Update Department</h2>
              <form onSubmit={handleSubmit} className="form">
                <div className="contact-form">
                  <div className="container">
                    <label>
                      <span>Department</span>
                      <select name="id" value={data.id} onChange={handleChange} required>
                        <option value="0">SELECT A DEPARTMENT</option>
                        {alldepartments.map(item => (
                          <option key={item.id} value={item.id}>{item.name}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Name</span>
                      <input
                        type="text"
                        placeholder="Enter Department Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      <span>Capacity</span>
                      <input
                        type="number"
                        placeholder="Enter Capacity"
                        name="capacity"
                        value={data.capacity}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <label>
                      <span>Password</span>
                      <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        required
                      />
                    </label>
                    <button type="submit" className="button-primary">
                      UPDATE
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UpdateDepartment;
