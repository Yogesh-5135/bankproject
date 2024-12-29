import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const DependentInformationForm = ({ loanid, onNext, onBack }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  const [dependentInfoId, setDependentInfoId] = useState(null);

  const baseURL = "http://localhost:9090";

  const onSubmit = (data) => {
    axios
      .post(`${baseURL}/saveDependent/${loanid}`, data)
      .then((response) => {
        setDependentInfoId(response.data.dependentInfoId);
        reset();
        onNext(loanid);
      })
      .catch((error) => {
        console.error("Error while saving dependent information", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Dependent Information Form</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="form-label">Number of Family Members</label>
          <input
            type="number"
            className={`form-control ${
              errors.noOfFamilyMember ? "is-invalid" : ""
            }`}
            {...register("noOfFamilyMember", {
              required: "Number of family members is required",
            })}
          />
          {errors.noOfFamilyMember && (
            <div className="invalid-feedback">
              {errors.noOfFamilyMember?.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Number of Children</label>
          <input
            type="number"
            className={`form-control ${errors.noOfChild ? "is-invalid" : ""}`}
            {...register("noOfChild", {
              required: "Number of children is required",
            })}
          />
          {errors.noOfChild && (
            <div className="invalid-feedback">{errors.noOfChild?.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Marital Status</label>
          <input
            type="text"
            className="form-control"
            {...register("maritalStatus", {
              required: "Marital status is required",
            })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Dependent Member</label>
          <input
            type="text"
            className="form-control"
            {...register("dependentMember", {
              required: "Dependent member is required",
            })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Family Income</label>
          <input
            type="number"
            className="form-control"
            {...register("familyIncome", {
              required: "Family income is required",
            })}
          />
        </div>

        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Previous Page
          </button>
          <button type="submit" className="btn btn-primary">
            Save and Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default DependentInformationForm;
