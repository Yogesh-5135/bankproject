import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CustomerProfileNav({ enquiry, setEnquiry }) {
  const [statusColor, setStatusColor] = useState("white");
  const navigate = useNavigate();
  useEffect(() => {
    console.log(enquiry);
    if (enquiry) {
      if (enquiry.enquiryStatus === "Pending") {
        setStatusColor("Orange");
      } else if (enquiry.enquiryStatus === "Approved") {
        setStatusColor("Blue");
      } else if (enquiry.enquiryStatus === "Approved for ApplyLoan") {
        setStatusColor("Green");
      } else {
        setStatusColor("Red");
      }
    }
  }, [enquiry]);

  function getUpdatedEnquiry() {
    axios
      .get(`http://localhost:9090/api/v1/getCustomer/${enquiry.customerid}`)
      .then((res) => {
        setEnquiry(res.data);
        sessionStorage.setItem("enquiry", JSON.stringify(res.data));
      });
  }

  const logout = () => {
    navigate("/");
  };

  const makeDisable = (e) => {
    const status = ["Rejected", "Approved", "Pending", "Closed"];
    if (status.includes(enquiry.enquiryStatus)) {
      e.preventDefault();
    }
  };
  return (
    <div>
      <header className="bg-dark text-white p-2 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="fs-5">Customer ID: {enquiry && enquiry.customerid}</h1>
          <h1 className="fs-6" style={{ color: statusColor }}>
            Status: {enquiry && enquiry.enquiryStatus}
          </h1>
        </div>
        <div>
          <button className="btn btn-primary" onClick={getUpdatedEnquiry}>
            Reload
          </button>
          <button onClick={logout} className="btn btn-danger m-2">
            Logout
          </button>
        </div>
      </header>
      <nav className="ms-5 me-5 d-flex">
        <Link className="btn btn-link">View Enquiry</Link>
        <Link className="btn btn-dark" onClick={makeDisable} to={"apply loan"}>
          Apply For Loan
        </Link>
        <Link className="btn btn-link">View Loan Application</Link>
        <Link className="btn btn-link">View Sanction</Link>
        <Link className="btn btn-link">Pay EMI</Link>
        <Link className="btn btn-link">EMI History</Link>
      </nav>
    </div>
  );
}

export default CustomerProfileNav;