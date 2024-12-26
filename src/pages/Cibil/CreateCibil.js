import React, { useEffect, useState } from "react";
import axios from "axios";

const CreateCibil = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/v1/getAllCustomer")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers", error);
      });
  }, []);

  const handleCheckCibil = (customerId) => {
    axios
      .put(`http://localhost:9095/api/v2/editCibil/${customerId}`)
      .then((response) => {
        alert(
          `Cibil Score fetched successfully for customer ID: ${customerId}`
        );
        window.location.reload();
      })
      .catch((error) => {
        alert("Error checking Cibil Score.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Customer List</h2>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Mobile No</th>
            <th>Pancard</th>
            <th>EnquiryStatus</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerid}>
              <td>{customer.name}</td>
              <td>{customer.username}</td>
              <td>{customer.email}</td>
              <td>{customer.age}</td>
              <td>{customer.mobileno}</td>
              <td>{customer.pancard}</td>
              <td>{customer.enquiryStatus}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleCheckCibil(customer.customerid)}
                >
                  Check Cibil Score
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreateCibil;
