import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../css/style.css";

function Signup() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rePassword: '',
    firstName: '',
    lastName: '',
    title: '',
    department: ''
  });

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get('http://localhost:9191/departments/get-all');
      setDepartments(data.filter(dept => dept.id !== 7)); // Filtering unwanted departments
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { email, password, rePassword } = formData;
    const newErrors = [];

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.push("Invalid email format.");
    }
    if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)) {
      newErrors.push("Password must contain at least 8 characters, with a mix of uppercase, lowercase, digits, and special characters.");
    }
    if (password !== rePassword) {
      newErrors.push("Passwords do not match.");
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const { status } = await axios.post('http://localhost:9191/handle/register', formData);
        if (status === 200) {
          alert("Successfully registered.");
          navigate('/');
        } else {
          alert("Error during registration.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("Error submitting form.");
      }
    }
  };

  return (
    <div>
      <header>
        <h1>Academia ERP</h1>
      </header>
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required />
          <input type="password" name="rePassword" placeholder="Repeat Password" value={formData.rePassword} onChange={handleChange} required />
          <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <select name="department" value={formData.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.name}</option>
            ))}
          </select>

          {errors.length > 0 && <div>{errors.map((error, i) => <p key={i}>{error}</p>)}</div>}

          <button type="submit">Sign Up</button>
        </form>

        <p>Already have an account? <Link to="/login">Sign In</Link></p>
      </main>
      <footer>Academia ERP Footer</footer>
    </div>
  );
}

export default Signup;
