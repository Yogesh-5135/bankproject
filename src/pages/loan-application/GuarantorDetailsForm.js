import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const GuarantorDetailsForm = ({ onNext, onBack, loanid }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const baseURL = "http://localhost:9090";

  const onSubmitCreate = (data) => {
    if (!loanid) {
      console.error("Loan ID is required.");
      return;
    } else {
      axios
        .post(`${baseURL}/saveGuarantor/${loanid}`, data)
        .then((response) => {
          alert("Loan Application Successfully Submitted");
          reset();
          onNext();
        })
        .catch((error) => {
          console.error("Error saving guarantor details!", error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Guarantor Details Form</h2>
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <div className="mb-3">
          <label htmlFor="guarantorName" className="form-label">
            Guarantor Name
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.guarantorName ? "is-invalid" : ""
            }`}
            id="guarantorName"
            {...register("guarantorName", {
              required: "Guarantor name is required",
            })}
          />
          {errors.guarantorName && (
            <div className="invalid-feedback">
              {errors.guarantorName.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorDateOfBirth" className="form-label">
            Guarantor Date of Birth
          </label>
          <input
            type="date"
            className={`form-control ${
              errors.guarantorDateOfBirth ? "is-invalid" : ""
            }`}
            id="guarantorDateOfBirth"
            {...register("guarantorDateOfBirth", {
              required: "Guarantor date of birth is required",
            })}
          />
          {errors.guarantorDateOfBirth && (
            <div className="invalid-feedback">
              {errors.guarantorDateOfBirth.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="guarantorRelationshipwithCustomer"
            className="form-label"
          >
            Guarantor Relationship with Customer
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.guarantorRelationshipwithCustomer ? "is-invalid" : ""
            }`}
            id="guarantorRelationshipwithCustomer"
            {...register("guarantorRelationshipwithCustomer", {
              required: "Guarantor relationship with customer is required",
            })}
          />
          {errors.guarantorRelationshipwithCustomer && (
            <div className="invalid-feedback">
              {errors.guarantorRelationshipwithCustomer.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorMobileNumber" className="form-label">
            Guarantor Mobile Number
          </label>
          <input
            type="tel"
            className={`form-control ${
              errors.guarantorMobileNumber ? "is-invalid" : ""
            }`}
            id="guarantorMobileNumber"
            {...register("guarantorMobileNumber", {
              required: "Guarantor mobile number is required",
            })}
          />
          {errors.guarantorMobileNumber && (
            <div className="invalid-feedback">
              {errors.guarantorMobileNumber.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorAdharCardNo" className="form-label">
            Guarantor Aadhar Card Number
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.guarantorAdharCardNo ? "is-invalid" : ""
            }`}
            id="guarantorAdharCardNo"
            {...register("guarantorAdharCardNo", {
              required: "Guarantor Aadhar card number is required",
            })}
          />
          {errors.guarantorAdharCardNo && (
            <div className="invalid-feedback">
              {errors.guarantorAdharCardNo.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorMortgageDetails" className="form-label">
            Guarantor Mortgage Details
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.guarantorMortgageDetails ? "is-invalid" : ""
            }`}
            id="guarantorMortgageDetails"
            {...register("guarantorMortgageDetails", {
              required: "Guarantor mortgage details are required",
            })}
          />
          {errors.guarantorMortgageDetails && (
            <div className="invalid-feedback">
              {errors.guarantorMortgageDetails.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorJobDetails" className="form-label">
            Guarantor Job Details
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.guarantorJobDetails ? "is-invalid" : ""
            }`}
            id="guarantorJobDetails"
            {...register("guarantorJobDetails", {
              required: "Guarantor job details are required",
            })}
          />
          {errors.guarantorJobDetails && (
            <div className="invalid-feedback">
              {errors.guarantorJobDetails.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorLoaclAddress" className="form-label">
            Guarantor Local Address
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.guarantorLoaclAddress ? "is-invalid" : ""
            }`}
            id="guarantorLoaclAddress"
            {...register("guarantorLoaclAddress", {
              required: "Guarantor local address is required",
            })}
          />
          {errors.guarantorLoaclAddress && (
            <div className="invalid-feedback">
              {errors.guarantorLoaclAddress.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="guarantorPermanentAddress" className="form-label">
            Guarantor Permanent Address
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.guarantorPermanentAddress ? "is-invalid" : ""
            }`}
            id="guarantorPermanentAddress"
            {...register("guarantorPermanentAddress", {
              required: "Guarantor permanent address is required",
            })}
          />
          {errors.guarantorPermanentAddress && (
            <div className="invalid-feedback">
              {errors.guarantorPermanentAddress.message}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuarantorDetailsForm;
