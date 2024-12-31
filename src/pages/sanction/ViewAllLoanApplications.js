import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewAllLoanApplications() {
  const [allLoanApplications, setAllLoanApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9090/getAllLoanApplication")
      .then((response) => {
        setAllLoanApplications(response.data);
      })
      .catch((error) => {
        console.error("Error fetching loan applications data:", error);
      });
  }, []);

  const handleGenerateCreditLimit = (loanid) => {
    axios
      .put(`http://localhost:9099/api/v3/generateCreditLimit/${loanid}`)
      .then((response) => {
        const updatedLoanApplications = allLoanApplications.map(
          (loanApplication) => {
            if (loanApplication.loanid === loanid) {
              return {
                ...loanApplication,
                sanctionId: response.data.sanctionId,
              };
            }
            return loanApplication;
          }
        );
        setAllLoanApplications(updatedLoanApplications);
        alert("Credit Limit Generated Successfully");
      })
      .catch((error) => {
        console.error("Error generating credit limit:", error);
        alert("Error generating credit limit.");
      });
  };

  const handleGetIntRate = (sanctionId) => {
    axios
      .put(`http://localhost:9099/api/v3/getIntRate/${sanctionId}`)
      .then((response) => {
        alert("Interest Rate Generated Successfully");
      })
      .catch((error) => {
        console.error("Error generating interest rate:", error);
        alert("Error generating interest rate.");
      });
  };

  const handleGetMonthlyEmi = (loanid, sanctionId) => {
    axios
      .put(`http://localhost:9099/api/v3/getmonthlyEmi/${loanid}/${sanctionId}`)
      .then((response) => {
        alert("Monthly EMI Generated Successfully");
      })
      .catch((error) => {
        console.error("Error generating monthly EMI:", error);
        alert("Error generating monthly EMI.");
      });
  };

  const handleGenerateSanctionLetter = (sanctionId, loanid) => {
    axios
      .put(
        `http://localhost:9099/api/v3/generateSanctionLetter/${sanctionId}/${loanid}`
      )
      .then((response) => {
        const sanctionDetails = response.data;
        navigate("/bankloan/view-saction-letter", {
          state: { sanction: sanctionDetails },
        });
      })
      .catch((error) => {
        console.error("Error generating sanction letter:", error);
        alert("Error generating sanction letter.");
      });
  };

  return (
    <div>
      <h2>Verified List</h2>
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
          {allLoanApplications.map((loanApplication) => (
            <tr key={loanApplication.loanid}>
              <td>{loanApplication.loanid}</td>
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
                  className="btn btn-sm btn-primary mx-1"
                  onClick={() =>
                    handleGenerateCreditLimit(loanApplication.loanid)
                  }
                >
                  Generate Credit Limit
                </button>
                {loanApplication.sanctionId && (
                  <>
                    <button
                      className="btn btn-sm btn-secondary mx-1"
                      onClick={() =>
                        handleGetIntRate(loanApplication.sanctionId)
                      }
                    >
                      Get Interest Rate
                    </button>
                    <button
                      className="btn btn-sm btn-success mx-1"
                      onClick={() =>
                        handleGetMonthlyEmi(
                          loanApplication.loanid,
                          loanApplication.sanctionId
                        )
                      }
                    >
                      Get Monthly EMI
                    </button>
                    <button
                      className="btn btn-sm btn-warning mx-1"
                      onClick={() =>
                        handleGenerateSanctionLetter(
                          loanApplication.sanctionId,
                          loanApplication.loanid
                        )
                      }
                    >
                      Generate Sanction Letter
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
