import React, { useEffect, useState } from "react";
import ProfileNav from "../templates/ProfileNav";
import { Routes, Route } from "react-router-dom";
import SideNav from "../templates/SideNav";
import "../styles/InternalLayout.css";
import { userRoutes } from "../rules/UserRoutesRules";

function InternalLayout() {
  const [employee, setEmployee] = useState({});
  const [requiredRoutes] = useState(userRoutes);
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
        <div className="col col-2 side-nav-container bg-secondary">
          <SideNav userType={employee.userType} />
        </div>
        <div className="col col-10 navigation-container">
          <Routes>
            {employee.userType &&
              requiredRoutes[0][employee.userType].map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.component}
                />
              ))}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default InternalLayout;
