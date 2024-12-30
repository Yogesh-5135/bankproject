import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function GetSubmittedList() {
  const [users, setUsers] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:9090/getAllLoanApplication")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);

  const handleCheckboxChange = (loanid, imageType) => {
    setSelectedCheckboxes((prevState) => {
      const userCheckboxes = prevState[loanid] || {};
      userCheckboxes[imageType] = !userCheckboxes[imageType];
      return {
        ...prevState,
        [loanid]: userCheckboxes,
      };
    });
  };

  const handleSelectAllChange = (loanid) => {
    const user = users.find((user) => user.loanid === loanid);
    if (user && user.allPersonalDocuments) {
      setSelectedCheckboxes((prevState) => {
        const allSelected = Object.keys(user.allPersonalDocuments).reduce(
          (acc, imageType) => {
            acc[imageType] = true;
            return acc;
          },
          {}
        );
        return {
          ...prevState,
          [loanid]: allSelected,
        };
      });
    }
  };

  const isAllCheckboxesSelected = (loanid) => {
    const userCheckboxes = selectedCheckboxes[loanid] || {};
    const user = users.find((user) => user.loanid === loanid);

    return (
      user &&
      Object.keys(user.allPersonalDocuments || {}).every(
        (imageType) => userCheckboxes[imageType]
      )
    );
  };

  const updateLoanStatus = (loanid) => {
    axios
      .put(`http://localhost:9090/updateLoanStatusAsVerified/${loanid}`)
      .then((response) => {
        setUsers(response.data);
        alert("Customer Verified Successfully");
        navigate("/bankloan/get-verified-list");
      })
      .catch((error) => {
        console.error("Error Verifying Customer:", error);
        alert("Error Verifying Customer");
      });
  };

  return (
    <div>
      <h2>Documents Verification</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Customer Name</th>
            <th>Loan Status</th>
            <th>Documents</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) &&
            users.map((user) => (
              <tr key={user.loanid}>
                <td>{user.loanid}</td>
                <td>{user.customerName}</td>
                <td>{user.loanStatus}</td>
                <td>
                  <div>
                    <input
                      type="checkbox"
                      checked={isAllCheckboxesSelected(user.loanid)}
                      onChange={() => handleSelectAllChange(user.loanid)}
                    />
                    <label>Select All</label>
                  </div>

                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}
                  >
                    {user.allPersonalDocuments?.addressProof && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.addressProof}`}
                          alt="address-proof"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.addressProof ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "addressProof")
                            }
                          />
                          <label>Address Proof</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.panCard && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.panCard}`}
                          alt="panCard"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.panCard || false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "panCard")
                            }
                          />
                          <label>Pancard</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.incomeTax && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.incomeTax}`}
                          alt="incomeTax"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.incomeTax ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "incomeTax")
                            }
                          />
                          <label>Income Tax</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.aadharCard && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.aadharCard}`}
                          alt="aadharCard"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.aadharCard ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "aadharCard")
                            }
                          />
                          <label>Aadhar Card</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.photo && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.photo}`}
                          alt="photo"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.photo || false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "photo")
                            }
                          />
                          <label>Photo</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.signature && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.signature}`}
                          alt="signature"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.signature ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "signature")
                            }
                          />
                          <label>Signature</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.bankCheque && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.bankCheque}`}
                          alt="bankCheque"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.bankCheque ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "bankCheque")
                            }
                          />
                          <label>Bank Cheque</label>
                        </div>
                      </div>
                    )}

                    {user.allPersonalDocuments?.salarySlips && (
                      <div>
                        <img
                          src={`data:image/jpeg;base64,${user.allPersonalDocuments.salarySlips}`}
                          alt="salarySlips"
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <input
                            type="checkbox"
                            checked={
                              selectedCheckboxes[user.loanid]?.salarySlips ||
                              false
                            }
                            onChange={() =>
                              handleCheckboxChange(user.loanid, "salarySlips")
                            }
                          />
                          <label>Salary Slip</label>
                        </div>
                      </div>
                    )}
                  </div>
                </td>

                <td>
                  <button
                    className="btn btn-primary btn-sm mx-2"
                    onClick={() => updateLoanStatus(user.loanid)}
                    disabled={!isAllCheckboxesSelected(user.loanid)}
                  >
                    Verify
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
