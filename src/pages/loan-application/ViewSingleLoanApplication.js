import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewSingleLoanApplication = ({ enquiry }) => {
  const [viewLoan, setViewLoan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!enquiry?.customerid) return;
    axios
      .get(
        `http://localhost:9090/getSingleLoanApplication/${enquiry?.customerid}`
      )
      .then((response) => {
        setViewLoan(response.data);
        console.log(enquiry?.customerid);
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

      {/* Loan Application Details Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Loan Application
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Loan ID:</strong>
            </td>
            <td>{viewLoan.loanid}</td>
          </tr>
          <tr>
            <td>
              <strong>Customer Name:</strong>
            </td>
            <td>{viewLoan.customerName}</td>
          </tr>
          <tr>
            <td>
              <strong>Date of Birth:</strong>
            </td>
            <td>{viewLoan.dob}</td>
          </tr>
          <tr>
            <td>
              <strong>Customer Age:</strong>
            </td>
            <td>{viewLoan.customerAge}</td>
          </tr>
          <tr>
            <td>
              <strong>Loan Status:</strong>
            </td>
            <td>{viewLoan.loanStatus}</td>
          </tr>
        </tbody>
      </table>

      {/* Customer Contact Details Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Customer Contact
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Email:</strong>
            </td>
            <td>{viewLoan.customerEmail}</td>
          </tr>
          <tr>
            <td>
              <strong>Mobile Number:</strong>
            </td>
            <td>{viewLoan.customerMobileNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Additional Mobile:</strong>
            </td>
            <td>{viewLoan.customerAdditionalMobileNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Address:</strong>
            </td>
            <td>
              {viewLoan.customerAddress.permanentAddress.houseNumber},{" "}
              {viewLoan.customerAddress.permanentAddress.streetName},{" "}
              {viewLoan.customerAddress.permanentAddress.cityname}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Account Details Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Account Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Account Type:</strong>
            </td>
            <td>{viewLoan.accountdetails.accountType}</td>
          </tr>
          <tr>
            <td>
              <strong>Account Holder Name:</strong>
            </td>
            <td>{viewLoan.accountdetails.accountHolderName}</td>
          </tr>
          <tr>
            <td>
              <strong>Account Balance:</strong>
            </td>
            <td>{viewLoan.accountdetails.accountBalance}</td>
          </tr>
          <tr>
            <td>
              <strong>Account Status:</strong>
            </td>
            <td>{viewLoan.accountdetails.accountStatus}</td>
          </tr>
        </tbody>
      </table>

      {/* Guarantor Details Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Guarantor Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Guarantor Name:</strong>
            </td>
            <td>{viewLoan.gurantordetails.guarantorName}</td>
          </tr>
          <tr>
            <td>
              <strong>Relationship with Customer:</strong>
            </td>
            <td>
              {viewLoan.gurantordetails.guarantorRelationshipwithCustomer}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Mobile Number:</strong>
            </td>
            <td>{viewLoan.gurantordetails.guarantorMobileNumber}</td>
          </tr>
          <tr>
            <td>
              <strong>Aadhar Card Number:</strong>
            </td>
            <td>{viewLoan.gurantordetails.guarantorAdharCardNo}</td>
          </tr>
        </tbody>
      </table>

      {/* Dependent Information Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Dependent Information
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>Family Members:</strong>
            </td>
            <td>{viewLoan.dependentInforamtion.noOfFamilyMember}</td>
          </tr>
          <tr>
            <td>
              <strong>Children:</strong>
            </td>
            <td>{viewLoan.dependentInforamtion.noOfChild}</td>
          </tr>
          <tr>
            <td>
              <strong>Marital Status:</strong>
            </td>
            <td>{viewLoan.dependentInforamtion.maritalStatus}</td>
          </tr>
          <tr>
            <td>
              <strong>Family Income:</strong>
            </td>
            <td>{viewLoan.dependentInforamtion.familyIncome}</td>
          </tr>
        </tbody>
      </table>

      {/* Personal Documents Table */}
      <table className="table table-bordered mt-4">
        <thead>
          <tr>
            <th colSpan="2" className="text-center">
              Personal Documents
            </th>
          </tr>
        </thead>
        <tbody>
          {viewLoan.allPersonalDocuments?.addressProof && (
            <tr>
              <td>
                <strong>Address Proof:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.addressProof}`}
                  alt="Address Proof"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.panCard && (
            <tr>
              <td>
                <strong>PAN Card:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.panCard}`}
                  alt="PAN Card"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.incomeTax && (
            <tr>
              <td>
                <strong>Income Tax:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.incomeTax}`}
                  alt="Income Tax"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.adharCard && (
            <tr>
              <td>
                <strong>Aadhar Card:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.adharCard}`}
                  alt="Aadhar Card"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.photo && (
            <tr>
              <td>
                <strong>Photo:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.photo}`}
                  alt="Photo"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.signature && (
            <tr>
              <td>
                <strong>Signature:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.signature}`}
                  alt="Signature"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.bankCheque && (
            <tr>
              <td>
                <strong>Bank Cheque:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.bankCheque}`}
                  alt="Bank Cheque"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.salarySlips && (
            <tr>
              <td>
                <strong>Salary Slips:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.salarySlips}`}
                  alt="Salary Slips"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.bankStatement && (
            <tr>
              <td>
                <strong>Bank Statement:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.bankStatement}`}
                  alt="Bank Statement"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}

          {viewLoan.allPersonalDocuments?.propertyDocument && (
            <tr>
              <td>
                <strong>Property Document:</strong>
              </td>
              <td>
                <img
                  src={`data:image/jpeg;base64,${viewLoan.allPersonalDocuments.propertyDocument}`}
                  alt="Property Document"
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewSingleLoanApplication;
