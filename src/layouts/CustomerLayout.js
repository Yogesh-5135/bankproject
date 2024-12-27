import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CustomerLayout() {
  const [customer, setCustomer] = useState({});
  const navigate = useNavigate();

  const getSessionData = () => {
    const userJson = sessionStorage.getItem("user");
    const user = JSON.parse(userJson);
    setCustomer(user);
  };

  useEffect(() => {
    getSessionData();
  }, []);

  const statusColor =
    customer.enquiryStatus === "Approved for ApplyLoan"
      ? "green"
      : customer.enquiryStatus === "Rejected"
      ? "red"
      : customer.enquiryStatus === "Approved"
      ? "lightblue"
      : "white";

  const reloadStatus = () => {
    getSessionData();
  };

  const logout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div>
      <header className="bg-dark text-white p-2 d-flex justify-content-between align-items-center">
        <div>
          <h1 className="fs-4">CustomerId: {customer.customerid}</h1>
          <h1 className="fs-5" style={{ color: statusColor }}>
            Status: {customer.enquiryStatus}
          </h1>
        </div>

        <div>
          <button onClick={reloadStatus} className="btn btn-warning m-2">
            Reload
          </button>
          <button onClick={logout} className="btn btn-danger m-2">
            Logout
          </button>
        </div>
      </header>
      <nav className="bg-dark text-white mt-2 ms-4 me-4">
        <h1>Welcome</h1>
      </nav>
    </div>
  );
}
