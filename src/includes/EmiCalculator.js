import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [emi, setEmi] = useState(null);

  const calculateEmi = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const tenureInMonths = parseInt(loanTenure) * 12;

    const monthlyRate = annualRate / 100 / 12;

    if (principal > 0 && monthlyRate > 0 && tenureInMonths > 0) {
      const emiValue =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureInMonths)) /
        (Math.pow(1 + monthlyRate, tenureInMonths) - 1);
      setEmi(emiValue.toFixed(2));
    } else {
      setEmi(null);
    }
  };

  return (
    <div className="bg-light mt-5 d-flex justify-content-center align-items-center">
      <div
        className="card p-4 shadow-lg"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center mb-4 text-primary">EMI Calculator</h2>
        <div className="form-group">
          <label className="font-weight-bold">Loan Amount (Principal):</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="form-control"
            placeholder="Enter loan amount"
          />
        </div>
        <div className="form-group mt-3">
          <label className="font-weight-bold">Annual Interest Rate (%):</label>
          <input
            type="number"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="form-control"
            placeholder="Enter interest rate"
          />
        </div>
        <div className="form-group mt-3">
          <label className="font-weight-bold">Loan Tenure (in years):</label>
          <input
            type="number"
            value={loanTenure}
            onChange={(e) => setLoanTenure(e.target.value)}
            className="form-control"
            placeholder="Enter loan tenure in years"
          />
        </div>
        <button className="btn btn-primary mt-4 w-100" onClick={calculateEmi}>
          Calculate EMI
        </button>

        {emi !== null && (
          <div className="mt-4 text-center">
            <h3 className="text-success">EMI: ₹{emi}</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmiCalculator;
