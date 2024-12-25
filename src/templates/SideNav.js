import React, { useState } from "react";
import { Link } from "react-router-dom";
import { userMenus } from "../rules/UserMenuRules";
function SideNav({ userType }) {
  const [userRoles] = useState(userMenus);

  return (
    <div>
      <h1 className="text-center">{userType}</h1>

      <div className="ms-5">
        {userType &&
          userRoles[0][userType].map((menu) => (
            <Link className="btn btn-light w-75 mb-3" to={menu.url}>
              {menu.label}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default SideNav;
