import React, { useEffect, useState } from "react";
import CustomerProfileNav from "../templates/CustomerProfileNav";

function CustomerLayout() {
  const [loginEnquiry, setLoginEnquiry] = useState();

  function getLoginEnquiry() {
    const enquiryJSON = sessionStorage.getItem("user");
    const enquiry = JSON.parse(enquiryJSON);
    setLoginEnquiry(enquiry);
  }

  useEffect(getLoginEnquiry, []);

  return (
    <div>
      <CustomerProfileNav enquiry={loginEnquiry} setEnquiry={setLoginEnquiry} />
    </div>
  );
}

export default CustomerLayout;
