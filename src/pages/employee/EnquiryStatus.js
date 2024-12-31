import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EnquiryStatus() {
  const [enquiryData, setEnquiryData] = useState({
    approvedCount: 0,
    rejectedCount: 0,
    pendingCount: 0
  });

  const getAllEnquiryStatus = () => {
    axios
      .get("http://localhost:9090/api/v1/getAllEnquiryStatus")
      .then((response) => {
        setEnquiryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching enquiry data:", error);
      });
  };

  useEffect(() => {
    getAllEnquiryStatus(); 
  }, []);

  const generateRandomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

  const renderCard = (status, count) => (
    <div
      className="card m-3"
      style={{
        width: "18rem",
        border: `2px solid ${generateRandomColor()}`,
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        padding: "20px",
      }}
    >
      <div className="card-body text-center">
        <h5 className="card-title">{status}</h5>
        <p className="card-text" style={{ fontSize: "20px" }}>
          {count}
        </p>
      </div>
    </div>
  );

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2>Enquiry Status Count</h2>
          <div className="d-flex flex-wrap justify-content-center">
            {renderCard("Approved", enquiryData.approvedCount)}
            {renderCard("Rejected", enquiryData.rejectedCount)}
            {renderCard("Pending", enquiryData.pendingCount)}
          </div>
        </div>
      </div>
    </div>
  );
}
