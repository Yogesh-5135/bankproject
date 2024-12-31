import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAllAccepted({ enquiry }) {
  const [emiLedger, setEmiLedger] = useState([]);
  const [processedLoans, setProcessedLoans] = useState(new Set()); // For tracking processed loans
  const navigate = useNavigate();

  // Fetch ledger details for the given customer
  useEffect(() => {
    axios
      .get(`http://localhost:9080/api/v4/getLedger/${enquiry.customerid}`)
      .then((response) => {
        setEmiLedger(response.data);
        console.log(response.data); // Log the response for debugging
      })
      .catch((error) => {
        console.error("Error fetching loan applications data:", error);
      });

    // Check localStorage for previously processed loans
    const storedProcessedLoans = JSON.parse(
      localStorage.getItem("processedLoans") || "[]"
    );
    setProcessedLoans(new Set(storedProcessedLoans)); // Initialize the Set with previously processed loans
  }, [enquiry.customerid]);

  // Handle the EMI payment
  const handlePayEmi = (loanid, ledgerId) => {
    axios
      .put(
        `http://localhost:9080/api/v4/updateLoanStatus/${loanid}/${ledgerId}`
      )
      .then((response) => {
        alert("Loan status updated successfully!");

        // Save processed loan to localStorage
        const updatedProcessedLoans = new Set(processedLoans);
        updatedProcessedLoans.add(ledgerId);
        setProcessedLoans(updatedProcessedLoans);
        localStorage.setItem(
          "processedLoans",
          JSON.stringify([...updatedProcessedLoans])
        ); // Store in localStorage

        // Optionally, refetch the ledger data if needed
        axios
          .get(`http://localhost:9080/api/v4/getLedger/${enquiry.customerid}`)
          .then((response) => {
            setEmiLedger(response.data);
          })
          .catch((error) => {
            console.error(
              "Error fetching loan applications data after update:",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Error updating loan status:", error);
        alert("Failed to update loan status!");
      });
  };

  // Navigate back to the bank loan page
  const handleBack = () => {
    navigate("/bankloan");
  };

  return (
    <div>
      {emiLedger.length > 0 ? (
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
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {emiLedger.map((ledgerItem) => (
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
                  <td>
                    <button
                      onClick={() =>
                        handlePayEmi(enquiry.customerid, ledgerItem.ledgerId)
                      }
                      className="btn btn-success"
                      disabled={processedLoans.has(ledgerItem.ledgerId)} // Disable if already processed
                    >
                      {processedLoans.has(ledgerItem.ledgerId)
                        ? "EMI Paid"
                        : "Pay EMI"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No ledger data available</p> // In case there is no ledger data
      )}

      <button className="btn btn-secondary" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}
