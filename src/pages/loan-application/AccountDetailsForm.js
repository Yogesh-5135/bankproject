import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const AccountDetailsForm = ({ onNext, onPrevious, loanid }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const baseURL = "http://localhost:9090";

  const onSubmitCreate = (data) => {
    axios
      .post(`${baseURL}/saveAccountDetails/${loanid}`, data)
      .then((response) => {
        reset();
        onNext(loanid);
      })
      .catch((error) => {
        console.error("Error saving account details!", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Account Details Form</h2>
      <form onSubmit={handleSubmit(onSubmitCreate)}>
        <div className="mb-3">
          <label htmlFor="accountType" className="form-label">
            Account Type
          </label>
          <select
            className={`form-select ${errors.accountType ? "is-invalid" : ""}`}
            id="accountType"
            {...register("accountType", {
              required: "Account type is required",
            })}
          >
            <option value="">Select Account Type</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
            <option value="Business">Business</option>
          </select>
          {errors.accountType && (
            <div className="invalid-feedback">{errors.accountType.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="accountBalance" className="form-label">
            Account Balance
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.accountBalance ? "is-invalid" : ""
            }`}
            id="accountBalance"
            {...register("accountBalance", {
              required: "Account balance is required",
            })}
          />
          {errors.accountBalance && (
            <div className="invalid-feedback">
              {errors.accountBalance.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="accountHolderName" className="form-label">
            Account Holder Name
          </label>
          <input
            type="text"
            className={`form-control ${
              errors.accountHolderName ? "is-invalid" : ""
            }`}
            id="accountHolderName"
            {...register("accountHolderName", {
              required: "Account holder name is required",
            })}
          />
          {errors.accountHolderName && (
            <div className="invalid-feedback">
              {errors.accountHolderName.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="accountStatus" className="form-label">
            Account Status
          </label>
          <select
            className={`form-select ${
              errors.accountStatus ? "is-invalid" : ""
            }`}
            id="accountStatus"
            {...register("accountStatus", {
              required: "Account status is required",
            })}
          >
            <option value="">Select Account Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Closed">Closed</option>
          </select>
          {errors.accountStatus && (
            <div className="invalid-feedback">
              {errors.accountStatus.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="accountNumber" className="form-label">
            Account Number
          </label>
          <input
            type="number"
            className={`form-control ${
              errors.accountNumber ? "is-invalid" : ""
            }`}
            id="accountNumber"
            {...register("accountNumber", {
              required: "Account number is required",
            })}
          />
          {errors.accountNumber && (
            <div className="invalid-feedback">
              {errors.accountNumber.message}
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button type="submit" className="btn btn-primary">
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetailsForm;
