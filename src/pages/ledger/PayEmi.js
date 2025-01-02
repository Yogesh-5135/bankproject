import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function ViewAllAccepted() {
  const [emiLedger, setEmiLedger] = useState([]);
  const { customerid } = useParams();
  const [processedLoans, setProcessedLoans] = useState(new Set());
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:9080/api/v4/getLedger/${customerid}`)
      .then((response) => {
        setEmiLedger(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loan applications data:", error);
      });

    const storedProcessedLoans = JSON.parse(
      localStorage.getItem("processedLoans") || "[]"
    );
    setProcessedLoans(new Set(storedProcessedLoans));
  }, [customerid]);

  const handlePayEmi = (loanid, ledgerId) => {
    axios
      .put(
        `http://localhost:9080/api/v4/updateLoanStatus/${loanid}/${ledgerId}`
      )
      .then((response) => {
        alert("Loan status updated successfully!");

        const updatedProcessedLoans = new Set(processedLoans);
        updatedProcessedLoans.add(ledgerId);
        setProcessedLoans(updatedProcessedLoans);
        localStorage.setItem(
          "processedLoans",
          JSON.stringify([...updatedProcessedLoans])
        );

        axios
          .get(`http://localhost:9080/api/v4/getLedger/${customerid}`)
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

  const handleBack = () => {
    navigate("/bankloan/customerlayout");
  };

  return (
    <div>
      {emiLedger.length > 0 ? (
        <div>
          <h3 className="text-center mt-2 ms-2 me-2">Ledger Details</h3>
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
                        handlePayEmi(customerid, ledgerItem.ledgerId)
                      }
                      className="btn btn-success"
                      disabled={processedLoans.has(ledgerItem.ledgerId)}
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
        <p>No ledger data available</p>
      )}

      <button className="btn btn-secondary" onClick={handleBack}>
        Back
      </button>
    </div>
  );
}
