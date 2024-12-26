import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AcceptedEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/api/v1/getAllApprovedCustomer"
      );
      setEnquiries(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Error: " + error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  if (loading) {
    return <div>Loading enquiries...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">All Approved Enquiries</h1>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Email</th>
              <th>Mobile No</th>
              <th>PAN Card</th>
              <th>Cibil Score</th>
              <th>Enquiry Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <tr key={enquiry.customerid}>
                <td>{enquiry.customerid}</td>
                <td>{enquiry.name}</td>
                <td>{enquiry.age}</td>
                <td>{enquiry.email}</td>
                <td>{enquiry.mobileno}</td>
                <td>{enquiry.pancard}</td>
                <td>{enquiry.cibil.cibilscore}</td>
                <td>{enquiry.enquiryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
