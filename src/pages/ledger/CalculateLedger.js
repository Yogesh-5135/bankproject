import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAllAccepted() {
  const [disbursedLoanApplications, setDisbursedLoanApplications] = useState(
    []
  );
  const [ledger, setLedger] = useState([]);
  const [processedLoans, setProcessedLoans] = useState(new Set());

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9090/getAllLoanApplication")
      .then((response) => {
        setDisbursedLoanApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loan applications data:", error);
      });
  }, []);

  const handleCalculateLedger = (loanid) => {
    axios
      .put(`http://localhost:9080/api/v4/updateLedger/${loanid}`)
      .then((response) => {
        alert("Ledger calculated successfully!");
        setLedger(response.data);
        setProcessedLoans((prev) => new Set(prev).add(loanid));
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error calculating ledger:", error);
        alert("Failed to calculate ledger!");
      });
  };

  const handleBack = () => {
    navigate("/bankloan");
  };

  return (
    <div>
      <h2>Loan Application Accepted List</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Customer Name</th>
            <th>Customer Dob</th>
            <th>Customer Age</th>
            <th>Cibil</th>
            <th>Gender</th>
            <th>Customer MobileNo</th>
            <th>Loan Amount Required</th>
            <th>Loan Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {disbursedLoanApplications.map((loanApplication, index) => (
            <tr key={loanApplication.loanid}>
              <td>{index + 1}</td>
              <td>{loanApplication.customerName}</td>
              <td>{loanApplication.dob}</td>
              <td>{loanApplication.customerAge}</td>
              <td>{loanApplication.cibil}</td>
              <td>{loanApplication.customerGender}</td>
              <td>{loanApplication.customerMobileNumber}</td>
              <td>{loanApplication.customerTotalLoanRequired}</td>
              <td>{loanApplication.loanStatus}</td>
              <td>
                <button
                  onClick={() => handleCalculateLedger(loanApplication.loanid)}
                  className="btn btn-primary"
                  disabled={processedLoans.has(loanApplication.loanid)}
                >
                  {processedLoans.has(loanApplication.loanid)
                    ? "Ledger Calculated"
                    : "Calculate Ledger"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {ledger.length > 0 && (
        <div>
          <h3>Ledger Details</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Ledger ID</th>
                <th>Ledger Created Date</th>
                <th>Total Loan Amount</th>
                <th>Payable Amount With Interest</th>
                <th>Tenure</th>
                <th>Rate of Interest</th>
                <th>Monthly EMI</th>
                <th>Amount Paid Till Date</th>
                <th>Remaining Amount</th>
                <th>Next EMI Date Start</th>
                <th>Next EMI Date End</th>
                <th>Defaulter Count</th>
                <th>Previous EMI Status</th>
                <th>Current Month EMI Status</th>
                <th>Loan End Date</th>
                <th>Loan Status</th>
              </tr>
            </thead>
            <tbody>
              {ledger.map((ledgerItem) => (
                <tr key={ledgerItem.ledgerId}>
                  <td>{ledgerItem.ledgerId}</td>
                  <td>
                    {new Date(
                      ledgerItem.ledgerCreatedDate
                    ).toLocaleDateString()}
                  </td>
                  <td>{ledgerItem.totalLoanAmount}</td>
                  <td>{ledgerItem.payableAmountWithInterest}</td>
                  <td>{ledgerItem.tenure}</td>
                  <td>{ledgerItem.rateOfInterest}</td>
                  <td>{ledgerItem.monthlyEMI}</td>
                  <td>{ledgerItem.amountPaidTillDate}</td>
                  <td>{ledgerItem.remainingAmount}</td>
                  <td>{ledgerItem.nextEmiDateStart}</td>
                  <td>{ledgerItem.nextEmiDateEnd}</td>
                  <td>{ledgerItem.defaulterCount}</td>
                  <td>{ledgerItem.previousEmiStatus}</td>
                  <td>{ledgerItem.currentMonthEmiStatus}</td>
                  <td>{ledgerItem.loanEndDate}</td>
                  <td>{ledgerItem.loanStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <button className="btn btn-secondary" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}
