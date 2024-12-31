import React, { useEffect, useState } from "react";
import CustomerProfileNav from "../templates/CustomerProfileNav";
import { Route, Routes } from "react-router-dom";
import ViewEnquiry from "../pages/enquiry/ViewEnquiry";
import MultiStepLoanApplicationForm from "../pages/loan-application/MultiStepLoanApplicationForm";
import ViewSingleLoanApplication from "../pages/loan-application/ViewSingleLoanApplication";
import ViewSanction from "../pages/sanction/ViewSanction";

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
        <Route
          path="view-loan-application"
          element={<ViewSingleLoanApplication enquiry={loginEnquiry} />}
        />
        <Route
          path="view-sanction"
          element={<ViewSanction enquiry={loginEnquiry} />}
        />
      </Routes>
    </div>
  );
}

export default CustomerLayout;
