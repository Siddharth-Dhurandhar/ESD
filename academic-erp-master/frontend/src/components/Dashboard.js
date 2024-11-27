import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../css/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [allDepartments, setAllDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("0");
  const [isAdmin, setIsAdmin] = useState(false);

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

  const fetchAllDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:9191/departments/get-all");
      setAllDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error.message);
    }
  };

  const fetchEmployees = async (departmentId = "0") => {
    try {
      const endpoint =
        departmentId === "0"
          ? "http://localhost:9191/employee/get-all"
          : `http://localhost:9191/employee/get/${departmentId}`;
      const response = await axios.get(endpoint);
      setEmployees(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:9191/handle/logout");
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  const handleDepartmentChange = (e) => {
    const departmentId = e.target.value;
    setSelectedDepartment(departmentId);
    fetchEmployees(departmentId);
  };

  useEffect(() => {
    fetchSessionData();
    fetchAllDepartments();
    fetchEmployees();
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Academia ERP Dashboard</h1>
        <nav>
          <Link to="/profile" className="dashboard-link">Profile</Link>
          <Link to="/dashboard" className="dashboard-link">Dashboard</Link>
          {isAdmin && (
            <>
              <Link to="/adddepart" className="dashboard-link">Add Dept.</Link>
              <Link to="/updatedep" className="dashboard-link">Update Dept.</Link>
              <Link to="/deletedep" className="dashboard-link">Delete Dept.</Link>
            </>
          )}
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </nav>
      </header>

      <main>
        <section className="department-select">
          <label>Select Department:</label>
          <select value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="0">All Departments</option>
            {allDepartments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </section>

        <section className="employees-section">
          <h2>Employees</h2>
          {employees.length === 0 ? (
            <p>No employees found.</p>
          ) : (
            employees.map((emp) => (
              <div className="employee-card" key={emp.id}>
                <p><strong>Name:</strong> {emp.first_name} {emp.last_name}</p>
                <p><strong>Email:</strong> {emp.email}</p>
                <p><strong>Title:</strong> {emp.title}</p>
                <p><strong>Department:</strong> {emp.department?.name}</p>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
