import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAllAccepted() {
  const [acceptedLoanApplications, setAcceptedLoanApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9090/getAllLoanApplication")
      .then((response) => {
        setAcceptedLoanApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loan applications data:", error);
      });
  }, []);

  const handleLoanDisburse = (loanid) => {
    axios
      .put(`http://localhost:9080/api/v4/update/${loanid}`)
      .then((response) => {
        console.log("Loan Disburse Successful:", response.data);
        alert("Loan Disburse Successful");
        navigate("/bankloan/calculateledger");
      })
      .catch((error) => {
        console.error("Error updating loan disbursement:", error);
      });
  };

  return (
    <div>
      <h2>Loan Application Accepted List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Customer Name</th>
            <th>Customer Dob</th>
            <th>Customer Age</th>
            <th>Cibil</th>
            <th>Gender</th>
            <th>Customer MobileNo</th>
            <th>Loan Amount Required</th>
            <th>Loan Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {acceptedLoanApplications.map((loanApplication) => (
            <tr key={loanApplication.loanid}>
              <td>{loanApplication.loanid}</td>
              <td>{loanApplication.customerName}</td>
              <td>{loanApplication.dob}</td>
              <td>{loanApplication.customerAge}</td>
              <td>{loanApplication.cibil}</td>
              <td>{loanApplication.customerGender}</td>
              <td>{loanApplication.customerMobileNumber}</td>
              <td>{loanApplication.customerTotalLoanRequired}</td>
              <td>{loanApplication.loanStatus}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleLoanDisburse(loanApplication.loanid)}
                >
                  Loan Disburse
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
