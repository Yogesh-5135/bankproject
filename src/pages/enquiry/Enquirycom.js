import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
const Enquirycom = () => {
  const [customerId, setCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);

  const { register, handleSubmit, setValue, reset } = useForm();

  useEffect(() => {
    axios
      .get("http://localhost:9090/api/v1/getAllCustomer")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers", error);
      });
  }, []);

  const onSubmit = (data) => {
    if (!customerId) {
      axios
        .post("http://localhost:9090/api/v1/saveCustomer", data)
        .then((response) => {
          alert("Enquiry Submitted Successfully!");
          reset();
          setCustomers([...customers, response.data]);
        })
        .catch((error) => {
          alert("Error submitting enquiry.");
          console.error("Error:", error);
        });
    } else {
      axios
        .put(`http://localhost:9090/api/v1/editCustomer/${customerId}`, data)
        .then((response) => {
          alert("Enquiry Updated Successfully!");
          setCustomerId(null);
          reset();

          axios
            .get("http://localhost:9090/api/v1/getAllCustomer")
            .then((response) => {
              setCustomers(response.data);
            });
        })
        .catch((error) => {
          alert("Error updating enquiry.");
          console.error("Error:", error);
        });
    }
  };

  const handleEdit = (customer) => {
    setCustomerId(customer.customerid);
    setValue("username", customer.username);
    setValue("password", customer.password);
    setValue("age", customer.age);
    setValue("email", customer.email);
    setValue("mobileno", customer.mobileno);
    setValue("pancard", customer.pancard);
    setValue("enquiryStatus", customer.enquiryStatus);
  };

  const handleDelete = (customerId) => {
    axios
      .delete(`http://localhost:9090/api/v1/deleteCustomer/${customerId}`)
      .then((response) => {
        alert("Customer deleted successfully!");
        setCustomers(
          customers.filter((customer) => customer.customerid !== customerId)
        );
      })
      .catch((error) => {
        alert("Error deleting customer.");
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Enquiry Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form Inputs */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            {...register("name", { required: "name is required" })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="form-control"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            name="age"
            id="age"
            className="form-control"
            placeholder="Enter your age"
            {...register("age", { required: "Age is required" })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="mobileno" className="form-label">
            Mobile No
          </label>
          <input
            type="number"
            name="mobileno"
            id="mobileno"
            className="form-control"
            placeholder="Enter your mobile number"
            {...register("mobileno", { required: "Mobile number is required" })}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="pancard" className="form-label">
            Pancard
          </label>
          <input
            type="text"
            name="pancard"
            id="pancard"
            className="form-control"
            placeholder="Enter your pancard number"
            {...register("pancard", { required: "Pancard number is required" })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {customerId ? "Update Enquiry" : "Submit Enquiry"}
        </button>
      </form>

      <h3 className="mt-5">Customer List</h3>
      <ul className="list-group">
        {customers.map((customer) => (
          <li
            key={customer.customerid}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {customer.username}
            <div>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => handleEdit(customer)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm ml-2"
                onClick={() => handleDelete(customer.customerid)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Enquirycom;
