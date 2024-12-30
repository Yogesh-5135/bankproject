import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewSingleLoanApplication = ({enquiry}) => {
  const [viewLoan, setViewLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enquiry?.customerid) return;
    axios
      .get(`http://localhost:9090/getSingleLoanApplication/${enquiry?.customerid}`) 
      .then((response) => {
        setViewLoan(response.data);
        console.log(enquiry?.customerid)
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching loan application data:", error);
        setLoading(false);
      });
  }, [enquiry?.customerid]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!viewLoan) {
    return <div>No loan application found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Loan Application Details</h2>

      <div className="loan-details">
        {/* Loan Application Details */}
        <div className="loan-card">
          <h3>Loan Application</h3>
          <div className="row mb-3">
            <div className="col-4"><strong>Loan ID:</strong></div>
            <div className="col-8">{viewLoan.loanid}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Customer Name:</strong></div>
            <div className="col-8">{viewLoan.customerName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Date of Birth:</strong></div>
            <div className="col-8">{viewLoan.dob}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Customer Age:</strong></div>
            <div className="col-8">{viewLoan.customerAge}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Loan Status:</strong></div>
            <div className="col-8">{viewLoan.loanStatus}</div>
          </div>
        </div>

        {/* Customer Contact Details */}
        <div className="loan-card mt-4">
          <h3>Customer Contact</h3>
          <div className="row mb-3">
            <div className="col-4"><strong>Email:</strong></div>
            <div className="col-8">{viewLoan.customerEmail}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Mobile Number:</strong></div>
            <div className="col-8">{viewLoan.customerMobileNumber}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Additional Mobile:</strong></div>
            <div className="col-8">{viewLoan.customerAdditionalMobileNumber}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Address:</strong></div>
            <div className="col-8">
              {viewLoan.customerAddress.permanentAddress.houseNumber}, {viewLoan.customerAddress.permanentAddress.streetName}, {viewLoan.customerAddress.permanentAddress.cityname}
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="loan-card mt-4">
          <h3>Account Details</h3>
          <div className="row mb-3">
            <div className="col-4"><strong>Account Type:</strong></div>
            <div className="col-8">{viewLoan.accountdetails.accountType}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Account Holder Name:</strong></div>
            <div className="col-8">{viewLoan.accountdetails.accountHolderName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Account Balance:</strong></div>
            <div className="col-8">{viewLoan.accountdetails.accountBalance}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Account Status:</strong></div>
            <div className="col-8">{viewLoan.accountdetails.accountStatus}</div>
          </div>
        </div>

        {/* Guarantor Details */}
        <div className="loan-card mt-4">
          <h3>Guarantor Details</h3>
          <div className="row mb-3">
            <div className="col-4"><strong>Name:</strong></div>
            <div className="col-8">{viewLoan.gurantordetails.guarantorName}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Relationship with Customer:</strong></div>
            <div className="col-8">{viewLoan.gurantordetails.guarantorRelationshipwithCustomer}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Mobile Number:</strong></div>
            <div className="col-8">{viewLoan.gurantordetails.guarantorMobileNumber}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Adhar Card Number:</strong></div>
            <div className="col-8">{viewLoan.gurantordetails.guarantorAdharCardNo}</div>
          </div>
        </div>

        {/* Dependent Information */}
        <div className="loan-card mt-4">
          <h3>Dependent Information</h3>
          <div className="row mb-3">
            <div className="col-4"><strong>Family Members:</strong></div>
            <div className="col-8">{viewLoan.dependentInforamtion.noOfFamilyMember}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Children:</strong></div>
            <div className="col-8">{viewLoan.dependentInforamtion.noOfChild}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Marital Status:</strong></div>
            <div className="col-8">{viewLoan.dependentInforamtion.maritalStatus}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Family Income:</strong></div>
            <div className="col-8">{viewLoan.dependentInforamtion.familyIncome}</div>
          </div>
        </div>

        {/* Personal Documents */}
        <div className="loan-card mt-4">
          <h3>Personal Documents</h3>
          
          {/* Address Proof */}
          {viewLoan.allPersonalDocuments?.addressProof && (
            <div className="row mb-3">
              <div className="col-4"><strong>Address Proof:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.addressProof}`}
                  alt="Address Proof"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* PAN Card */}
          {viewLoan.allPersonalDocuments?.panCard && (
            <div className="row mb-3">
              <div className="col-4"><strong>PAN Card:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.panCard}`}
                  alt="PAN Card"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Income Tax */}
          {viewLoan.allPersonalDocuments?.IncomeTax && (
            <div className="row mb-3">
              <div className="col-4"><strong>Income Tax:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.IncomeTax}`}
                  alt="Income Tax"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Aadhar Card */}
          {viewLoan.allPersonalDocuments?.addharCard && (
            <div className="row mb-3">
              <div className="col-4"><strong>Aadhar Card:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.addharCard}`}
                  alt="Aadhar Card"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Photo */}
          {viewLoan.allPersonalDocuments?.photo && (
            <div className="row mb-3">
              <div className="col-4"><strong>Photo:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.photo}`}
                  alt="Photo"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Signature */}
          {viewLoan.allPersonalDocuments?.signature && (
            <div className="row mb-3">
              <div className="col-4"><strong>Signature:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.signature}`}
                  alt="Signature"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          {/* Bank Cheque */}
          {viewLoan.allPersonalDocuments?.bankCheque && (
            <div className="row mb-3">
              <div className="col-4"><strong>Bank Cheque:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.bankCheque}`}
                  alt="Bank Cheque"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

            {viewLoan.allPersonalDocuments?.incomeTax && (
                <div className="row mb-3">
                <div className="col-4"><strong>Income Tax:</strong></div>
               
                <div className="col-8">
                    <img
                    src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.incomeTax}`}
                    alt="Income Tax"
                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                    />
                </div>
                </div>
          
            )}

          {/* Salary Slips */}
          {viewLoan.allPersonalDocuments?.salarySlips && (
            <div className="row mb-3">
              <div className="col-4"><strong>Salary Slips:</strong></div>
              <div className="col-8">
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.salarySlips}`}
                  alt="Salary Slips"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </div>
            </div>
          )}

           {/* Loan Disbursement & Sanction Letter */}
        <div className="loan-card mt-4">
          <h3>Loan Disbursement & Verification</h3>
          <div className="row mb-3">
            <div className="col-4"><strong>Loan Disbursement:</strong></div>
            <div className="col-8">{viewLoan.loanDisbursement ? viewLoan.loanDisbursement : "Not Disbursed"}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Sanction Letter:</strong></div>
            <div className="col-8">{viewLoan.sanctionLetter ? viewLoan.sanctionLetter : "Not Provided"}</div>
          </div>
          <div className="row mb-3">
            <div className="col-4"><strong>Verification Status:</strong></div>
            <div className="col-8">{viewLoan.customerVerification ? viewLoan.customerVerification : "Not Verified"}</div>
          </div>
        </div>


        </div>
      </div>
    </div>
  );
};

export default ViewSingleLoanApplication;
