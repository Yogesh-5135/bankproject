import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewEmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9898/api/v5/getAllAdmin")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (empID) => {
    axios
      .delete(`http://localhost:9898/api/v5/delete/${empID}`)
      .then((response) => {
        setEmployees((prev) => prev.filter((emp) => emp.empID !== empID));
        alert("Employee deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Error deleting employee");
      });
  };

  const handleEdit = (empID) => {
    navigate(`/bankloan/add-employee/${empID}`);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.userType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (employees.length === 0) {
    return <div>No employees found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Employee List</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by User Type"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Age</th>
            <th>User Type</th>
            <th>Employee Image</th>
            <th>Pancard Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr key={employee.empID}>
              <td>{employee.empFirstName}</td>
              <td>{employee.empMiddleName}</td>
              <td>{employee.empLastName}</td>
              <td>{employee.empEmail}</td>
              <td>{employee.empSalary}</td>
              <td>{employee.empAge}</td>
              <td>{employee.userType}</td>

              <td>
                {employee.empImage && (
                  <img
                    src={`data:image/jpeg;base64,${employee.empImage}`}
                    alt="Employee"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </td>

              <td>
                {employee.empPancard && (
                  <img
                    src={`data:image/jpeg;base64,${employee.empPancard}`}
                    alt="Pancard"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                )}
              </td>

              <td>
                <button
                  className="btn btn-primary btn-sm mx-2"
                  onClick={() => handleEdit(employee.empID)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee.empID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewEmployeeTable;
