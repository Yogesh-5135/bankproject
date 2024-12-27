import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const saveData = (data) => {
    if (data.isStaff) {
      axios
        .get(
          `http://localhost:9898/api/v5/getEmployee/${data.username}/${data.password}`
        )
        .then((res) => {
          console.log(res.data);
          sessionStorage.setItem("user", JSON.stringify(res.data));
          navigate("/bankloan");
        })
        .catch((error) => alert(error.message));
    } else {
      axios
        .get(
          `http://localhost:9090/api/v1/getCustomer/${data.username}/${data.password}`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.enquiryStatus === "Closed") {
            alert("Your account is closed. You cannot login.");

            return;
          }
          sessionStorage.setItem("user", JSON.stringify(res.data));
          navigate("/bankloan/customerlayout");
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <div className="container mt-5 w-50">
      <h2 className="text-center">Login</h2>
      <form
        onSubmit={handleSubmit(saveData)}
        className="border p-4 rounded shadow-sm"
      >
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            {...register("username", { required: true })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            {...register("password", { required: true })}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            id="staff-checkbox"
            className="form-check-input"
            {...register("isStaff")}
          />
          <label htmlFor="staff-checkbox" className="form-check-label">
            Are you a staff member?
          </label>
        </div>
        <button type="submit" className="btn btn-primary btn-block">
          Login
        </button>
      </form>
    </div>
  );
}
