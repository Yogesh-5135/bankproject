import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const EmployeeEnrollmentForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();

    const employeeInfo = {
      empFirstName: data.empFirstName,
      empMiddleName: data.empMiddleName,
      empLastName: data.empLastName,
      empEmail: data.empEmail,
      empSalary: data.empSalary,
      empAge: data.empAge,
      userType: data.userType,
    };

    formData.append("info", JSON.stringify(employeeInfo));

    if (data.empImage[0]) {
      formData.append("empImage", data.empImage[0]);
    }

    if (data.empPancard[0]) {
      formData.append("empPancard", data.empPancard[0]);
    }

    axios
      .post("http://localhost:9898/api/v5/saveAdmin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        alert("Employee added successfully.");
        navigate("/bankloan/view-employee");
      })
      .catch((error) => {
        console.error("Error submitting employee data:", error);
        alert("Error submitting employee data.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Employee Enrollment Form</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow"
        style={{ height: "650px", overflowY: "auto" }}
      >
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.empFirstName ? "is-invalid" : ""
            }`}
            {...register("empFirstName", {
              required: "First name is required",
            })}
          />
          {errors.empFirstName && (
            <div className="invalid-feedback">
              {errors.empFirstName.message}
            </div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Middle Name</label>
          <input
            type="text"
            className={`form-control ${
              errors.empMiddleName ? "is-invalid" : ""
            }`}
            {...register("empMiddleName")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className={`form-control ${errors.empLastName ? "is-invalid" : ""}`}
            {...register("empLastName", { required: "Last name is required" })}
          />
          {errors.empLastName && (
            <div className="invalid-feedback">{errors.empLastName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.empEmail ? "is-invalid" : ""}`}
            {...register("empEmail", { required: "Email is required" })}
          />
          {errors.empEmail && (
            <div className="invalid-feedback">{errors.empEmail.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Salary</label>
          <input
            type="number"
            className={`form-control ${errors.empSalary ? "is-invalid" : ""}`}
            {...register("empSalary", { required: "Salary is required" })}
          />
          {errors.empSalary && (
            <div className="invalid-feedback">{errors.empSalary.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Age</label>
          <input
            type="number"
            className={`form-control ${errors.empAge ? "is-invalid" : ""}`}
            {...register("empAge", { required: "Age is required" })}
          />
          {errors.empAge && (
            <div className="invalid-feedback">{errors.empAge.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">User Type</label>
          <select
            className={`form-control ${errors.userType ? "is-invalid" : ""}`}
            {...register("userType", { required: "User type is required" })}
          >
            <option value="">Select User Type</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CRM">CRM</option>
            <option value="OE">OE</option>
            <option value="AH">AH</option>
            <option value="CM">CM</option>
          </select>
          {errors.userType && (
            <div className="invalid-feedback">{errors.userType.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Employee Image</label>
          <input
            type="file"
            className="form-control"
            {...register("empImage", {
              required: "Employee image is required",
            })}
          />
          {errors.empImage && (
            <div className="invalid-feedback">{errors.empImage.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Upload Pan Card</label>
          <input
            type="file"
            className="form-control"
            {...register("empPancard", { required: "Pan card is required" })}
          />
          {errors.empPancard && (
            <div className="invalid-feedback">{errors.empPancard.message}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeEnrollmentForm;
