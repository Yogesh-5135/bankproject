import React, { useEffect, useState } from "react";
import ProfileNav from "../templates/ProfileNav";
import SideNav from "../templates/SideNav";
import "../styles/InternalLayout.css";

function InternalLayout() {
  const [employee, setEmployee] = useState({});
  const getSessionData = () => {
    const userJson = sessionStorage.getItem("user");
    const user = JSON.parse(userJson);
    setEmployee(user);
  };

  useEffect(getSessionData, []);
  return (
    <div>
      <ProfileNav data={employee} />
      <div className="row w-100">
        <div className="col col-3 side-nav-container bg-secondary">
          <SideNav userType={employee.userType} />
        </div>
        <div className="col col-9 navigation-container">
          <h1>All Routes render here..</h1>
        </div>
      </div>
    </div>
  );
}

export default InternalLayout;
