import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewEmiHistory({ enquiry }) {
  const [emiHistory, setEmiHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `http://localhost:9080/api/v4/getLedgerOnlyEmiPaid/${enquiry.customerid}`
      )
      .then((response) => {
        setEmiHistory(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loan applications data:", error);
      });
  }, [enquiry.customerid]);

  const handleBack = () => {
    navigate("/bankloan/customerlayout");
  };

  return (
    <div>
      {emiHistory.length > 0 ? (
        <div>
          <h3 className="text-center mt-2 ms-2 me-2">Emi History</h3>
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
              {emiHistory.map((ledgerItem) => (
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
      ) : (
        <p>No Emi History available</p>
      )}

      <button className="btn btn-secondary" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}
