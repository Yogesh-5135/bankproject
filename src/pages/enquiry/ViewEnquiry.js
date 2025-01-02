import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const Enquirycom = () => {
  const [customerData, setCustomerData] = useState(null);
  const navigate = useNavigate();
  const { customerid } = useParams();

  function getEnquiry() {
    if (customerid) {
      axios
        .get(`http://localhost:9090/api/v1/getCustomer/${customerid}`)
        .then((response) => {
          setCustomerData(response.data);
        })
        .catch((error) => {
          alert("Error fetching customer data.");
          console.error("Error:", error);
        });
    }
  }

  useEffect(() => {
    getEnquiry();
  }, []);

  const goBack = () => {
    navigate("/bankloan/customerlayout");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Customer Information</h2>

      {customerData && (
        <div className="table-responsive d-flex justify-content-center">
          <table
            className="table table-bordered table-striped"
            style={{ width: "60%" }}
          >
            <thead>
              <tr>
                <th>Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Customer ID</td>
                <td>{customerData.customerid}</td>
              </tr>
              <tr>
                <td>Username</td>
                <td>{customerData.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{customerData.email}</td>
              </tr>
              <tr>
                <td>Mobile No</td>
                <td>{customerData.mobileno}</td>
              </tr>
              <tr>
                <td>Age</td>
                <td>{customerData.age}</td>
              </tr>
              <tr>
                <td>Pancard</td>
                <td>{customerData.pancard}</td>
              </tr>
              <tr>
                <td>Enquiry Status</td>
                <td>{customerData.enquiryStatus}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={goBack}>
          Back
        </button>
      </div>
    </div>
  );
};

export default Enquirycom;
