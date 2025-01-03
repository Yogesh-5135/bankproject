import React from "react";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import { Route, Routes } from "react-router-dom";
import About from "../templates/About";
import "../styles/ExternalLayout.css";
import OurService from "../templates/OurService";
import Login from "../includes/Login";
import Enquirycom from "../pages/enquiry/Enquirycom";
import EmiCalculator from "../includes/EmiCalculator";

function ExternalLayout() {
  return (
    <div>
      <Header />
      <div className="navigationContainer">
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<OurService />} />
          <Route path="/emi-calculator" element={<EmiCalculator />} />
          <Route path="/enquiry" element={<Enquirycom />} />
          <Route path="/sign-in" element={<Login />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default ExternalLayout;
