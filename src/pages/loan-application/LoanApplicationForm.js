import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const LoanApplicationForm = ({ onNext, enquiry }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const baseURL = "http://localhost:9090";

  useEffect(() => {
    if (enquiry) {
      setValue("customerName", enquiry.name);
      setValue("customerMobileNumber", enquiry.mobileno);
      setValue("customerEmail", enquiry.email);
    }
  }, [enquiry, setValue]);

  const onSubmitCreate = (data) => {
    axios
      .post(`${baseURL}/saveLoanApplication`, data)
      .then((response) => {
        const loanid = response.data.loanid;
        console.log("Generated Loan ID: ", loanid);
        reset();
        onNext(loanid);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Loan Application Form</h2>
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <div className="mb-3">
          <label htmlFor="customerName" className="form-label">
            Customer Name
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.customerName ? "is-invalid" : ""
            }`}
            id="customerName"
            {...register("customerName", {
              required: "Customer name is required",
            })}
          />
          {errors.customerName && (
            <div className="invalid-feedback">
              {errors.customerName.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">
            Date of Birth
          </label>
          <input
            type="date"
            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            id="dob"
            {...register("dob", { required: "Date of birth is required" })}
          />
          {errors.dob && (
            <div className="invalid-feedback">{errors.dob.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="customerAge" className="form-label">
            Customer Age
          </label>
          <input
            type="number"
            className={`form-control ${errors.customerAge ? "is-invalid" : ""}`}
            id="customerAge"
            {...register("customerAge", {
              required: "Customer age is required",
            })}
          />
          {errors.customerAge && (
            <div className="invalid-feedback">{errors.customerAge.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="requiredTenure" className="form-label">
            Required Tenure (in months)
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.requiredTenure ? "is-invalid" : ""
            }`}
            id="requiredTenure"
            {...register("requiredTenure", { required: "Tenure is required" })}
          />
          {errors.requiredTenure && (
            <div className="invalid-feedback">
              {errors.requiredTenure.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="customerGender" className="form-label">
            Customer Gender
          </label>
          <select
            className={`form-select ${
              errors.customerGender ? "is-invalid" : ""
            }`}
            id="customerGender"
            {...register("customerGender", { required: "Gender is required" })}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.customerGender && (
            <div className="invalid-feedback">
              {errors.customerGender.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="customerEmail" className="form-label">
            Customer Email
          </label>
          <input
            type="email"
            className={`form-control ${
              errors.customerEmail ? "is-invalid" : ""
            }`}
            id="customerEmail"
            {...register("customerEmail", {
              required: "Customer email is required",
            })}
          />
          {errors.customerEmail && (
            <div className="invalid-feedback">
              {errors.customerEmail.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="customerMobileNumber" className="form-label">
            Customer Mobile Number
          </label>
          <input
            type="tel"
            className={`form-control ${
              errors.customerMobileNumber ? "is-invalid" : ""
            }`}
            id="customerMobileNumber"
            {...register("customerMobileNumber", {
              required: "Customer mobile number is required",
            })}
          />
          {errors.customerMobileNumber && (
            <div className="invalid-feedback">
              {errors.customerMobileNumber.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="customerAdditionalMobileNumber"
            className="form-label"
          >
            Customer Additional Mobile Number
          </label>
          <input
            type="tel"
            className={`form-control ${
              errors.customerAdditionalMobileNumber ? "is-invalid" : ""
            }`}
            id="customerAdditionalMobileNumber"
            {...register("customerAdditionalMobileNumber")}
          />
          {errors.customerAdditionalMobileNumber && (
            <div className="invalid-feedback">
              {errors.customerAdditionalMobileNumber.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="customerAmountPaidForHome" className="form-label">
            Amount Paid for Home
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.customerAmountPaidForHome ? "is-invalid" : ""
            }`}
            id="customerAmountPaidForHome"
            {...register("customerAmountPaidForHome", {
              required: "Amount paid for home is required",
            })}
          />
          {errors.customerAmountPaidForHome && (
            <div className="invalid-feedback">
              {errors.customerAmountPaidForHome.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="customerTotalLoanRequired" className="form-label">
            Total Loan Required
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.customerTotalLoanRequired ? "is-invalid" : ""
            }`}
            id="customerTotalLoanRequired"
            {...register("customerTotalLoanRequired", {
              required: "Total loan required is required",
            })}
          />
          {errors.customerTotalLoanRequired && (
            <div className="invalid-feedback">
              {errors.customerTotalLoanRequired.message}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
