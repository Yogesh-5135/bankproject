import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EmpData() {
  const [employees, setEmployees] = useState([]);
  const [userTypeCount, setUserTypeCount] = useState({});

  const getAllAdmin = () => {
    axios
      .get("http://localhost:9898/api/v5/getAllAdmin")
      .then((response) => {
        setEmployees(response.data);
        countUserTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  };

  const countUserTypes = (data) => {
    const count = data.reduce((acc, emp) => {
      const userType = emp.userType;
      acc[userType] = acc[userType] ? acc[userType] + 1 : 1;
      return acc;
    }, {});
    setUserTypeCount(count);
  };

  useEffect(() => {
    getAllAdmin(); 
  }, []);

  const generateCardColor = (index) => {
    const colors = [
      "#FF5733", 
      "#33FF57", 
      "#3357FF", 
      "#FF33A1", 
      "#FFC300", 
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>User Type Count</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {employees.map((employee, index) => (
              <div
                key={employee.id} 
                className="card m-3"
                style={{
                  width: "18rem",
                  border: `2px solid ${generateCardColor(index)}`,
                  borderRadius: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  padding: "20px",
                }}
              >
                <div className="card-body text-center">
                  <h5 className="card-title">{employee.userType}</h5>
                  <p className="card-text" style={{ fontSize: "20px" }}>
                    {userTypeCount[employee.userType] || 0}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
