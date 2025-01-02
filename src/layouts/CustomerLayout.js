import React, { useEffect, useState } from "react";
import CustomerProfileNav from "../templates/CustomerProfileNav";
import { Route, Routes } from "react-router-dom";
import ViewEnquiry from "../pages/enquiry/ViewEnquiry";
import MultiStepLoanApplicationForm from "../pages/loan-application/MultiStepLoanApplicationForm";
import ViewSingleLoanApplication from "../pages/loan-application/ViewSingleLoanApplication";
import ViewSanction from "../pages/sanction/ViewSanction";
import PayEmi from "../pages/ledger/PayEmi";
import EmiHistory from "../pages/ledger/EmiHistory";

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
        <Route path="view-enquiry/:customerid" element={<ViewEnquiry />} />
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
        <Route path="pay-emi/:customerid" element={<PayEmi />} />
        <Route path="emi-history/:customerid" element={<EmiHistory />} />
      </Routes>
    </div>
  );
}

export default CustomerLayout;
