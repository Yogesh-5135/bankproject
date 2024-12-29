import React, { useEffect, useState } from "react";
import CustomerProfileNav from "../templates/CustomerProfileNav";
import { Route, Routes } from "react-router-dom";
import ViewEnquiry from "../pages/enquiry/ViewEnquiry";
import MultiStepLoanApplicationForm from "../pages/loan-application/MultiStepLoanApplicationForm";

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
      <Routes>
        <Route
          path="view-enquiry"
          element={<ViewEnquiry enquiry={loginEnquiry} />}
        />
        <Route
          path="apply-loan"
          element={<MultiStepLoanApplicationForm enquiry={loginEnquiry} />}
        />
      </Routes>
    </div>
  );
}

export default CustomerLayout;
