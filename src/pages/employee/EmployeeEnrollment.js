import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeEnrollment = () => {
  const { empID } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const [empImage, setEmpImage] = useState(null);
  const [empPanCard, setEmpPanCard] = useState(null);

  const getEditData = () => {
    if (empID) {
      axios
        .get(`http://localhost:9898/api/v5/getAdmin/${empID}`)
        .then((response) => {
          const employeeData = response.data;
          const formFields = [
            'empFirstName', 'empMiddleName', 'empLastName', 
            'empEmail', 'empSalary', 'empAge', 'userType'
          ];

          for (let prop in employeeData) {
            if (formFields.includes(prop)) {
              setValue(prop, employeeData[prop]);
            }
            else if (prop === 'empImage') {
              setEmpImage(employeeData[prop]);
            } else if (prop === 'empPancard') {
              setEmpPanCard(employeeData[prop]);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching employee data:", error);
        });
    }
  };

  useEffect(() => {
    if (!empID) {
      reset();
    } else {
      getEditData();
    }
  }, [empID, reset]);

  const onSelectEmpImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmpImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSelectPanCard = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEmpPanCard(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

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
    if (empImage) formData.append("empImage", empImage);  
    if (empPanCard) formData.append("empPancard", empPanCard);

    const apiEndpoint = empID
      ? `http://localhost:9090/api/v1/editEmployee/${empID}`
      : "http://localhost:9090/api/v1/saveEmployee";

    const requestMethod = empID ? axios.put : axios.post;

    requestMethod(apiEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        alert("Employee data saved successfully.");
        navigate("/viewEmployees");
      })
      .catch((error) => {
        console.error("Error submitting employee data:", error);
        alert("Error submitting employee data.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>{empID ? "Edit Employee" : "Employee Enrollment Form"}</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 border rounded shadow"
        style={{ height: "650px", overflowY: "auto" }}
      >
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className={`form-control ${errors.empFirstName ? "is-invalid" : ""}`}
            {...register("empFirstName", { required: "First name is required" })}
          />
          {errors.empFirstName && (
            <div className="invalid-feedback">{errors.empFirstName.message}</div>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Middle Name</label>
          <input
            type="text"
            className={`form-control ${errors.empMiddleName ? "is-invalid" : ""}`}
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
            className={`form-control ${errors.empImage ? "is-invalid" : ""}`}
            onChange={onSelectEmpImage}
          />
          {empImage && (
            <img src={`data:image/jpeg;base64,${empImage}`} alt="Employee Image" />
          )}
        </div>


        <div className="mb-3">
          <label className="form-label">Upload Pan Card</label>
          <input
            type="file"
            className={`form-control ${errors.empPanCard ? "is-invalid" : ""}`}
            onChange={onSelectPanCard}
          />
          {empPanCard && (
            <img src={`data:image/jpeg;base64,${empPanCard}`} alt="Pan Card" />
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {empID ? "Update Employee" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeEnrollment;
