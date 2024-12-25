
import React, { useState } from "react";
import { Link } from "react-router-dom";


function SideNav({ userType }) {
  const prefix = "/easyfinance/";
  const userMenus = [
    //0 index
    {
      ADMIN: [
        { url: `${prefix}add-employee`, label: "Add Employee" },
        { url: `${prefix}view-employee`, label: "View Employee" },
        { url: `${prefix}View-enquiries`, label: "View Enquiries" },
      ],
      CRM: [
        { url: `${prefix}view-new-enquiries`, label: "Registerd Enquiries" },
        { url: `${prefix}view-enquiry-feedback`, label: "Feedback Enquiries" },
      ],
      OE: [],
    },
  ];
  const [userRoles, setUserRoles] = useState(userMenus);

  return (
    <div>
      <h1>{userType}</h1>

      <div className="ms-5">
        {userType &&
          userRoles[0][userType].map((menu) => (
            <Link className="btn btn-light w-75 mb-3" to={menu.url}>
              {" "}
              {menu.label}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SideNav;
