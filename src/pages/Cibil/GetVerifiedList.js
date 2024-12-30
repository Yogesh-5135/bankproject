import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function GetVerifiedList() {
  const [verifiedUsers, setVerifiedUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9095/api/v2/getAllDocumentVerifiedList")
      .then((response) => {
        setVerifiedUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Verified List</h2>
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
          </tr>
        </thead>
        <tbody>
          {verifiedUsers.map((user) => (
            <tr key={user.loanid}>
              <td>{user.loanid}</td>
              <td>{user.customerName}</td>
              <td>{user.dob}</td>
              <td>{user.customerAge}</td>
              <td>{user.cibil}</td>
              <td>{user.customerGender}</td>
              <td>{user.customerMobileNumber}</td>
              <td>{user.customerTotalLoanRequired}</td>
              <td>{user.loanStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
