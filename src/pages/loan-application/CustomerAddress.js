import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const CustomerAddress = ({ onNext, loanid, onBack }) => {
  const [customerAddressId, setCustomerAddressId] = useState(null);
  const baseURL = "http://localhost:9090";

  const {
    register: registerPermanent,
    handleSubmit: handleSubmitPermanent,
    reset: resetPermanent,
    formState: { errors: errorsPermanent },
    setError: setErrorPermanent,
  } = useForm();

  const {
    register: registerLocal,
    handleSubmit: handleSubmitLocal,
    reset: resetLocal,
    formState: { errors: errorsLocal },
    setError: setErrorLocal,
  } = useForm();

  const submitCustomerAddress = () => {
    axios
      .post(`${baseURL}/saveCustomerAddress/${loanid}`)
      .then((response) => {
        setCustomerAddressId(response.data.customerAddressId);
        console.log("Customer Address ID:", response.data.customerAddressId);
      })
      .catch((error) => {
        console.error("Error creating Customer Address:", error);
      });
  };

  useEffect(() => {
    if (loanid) {
      submitCustomerAddress();
    }
  }, [loanid]);

  const onSubmitPermanentAddress = (permanentAddressdata) => {
    axios
      .post(
        `${baseURL}/savePermanentAddress/${customerAddressId}`,
        permanentAddressdata
      )
      .then(() => {
        alert("Permanent Address saved successfully!");
        resetPermanent();
      })
      .catch((error) => {
        setErrorPermanent("general", {
          type: "manual",
          message: "Error saving Permanent Address",
        });
        console.error(error);
      });
  };

  const onSubmitLocalAddress = (localAddressdata) => {
    axios
      .post(`${baseURL}/saveLocal/${customerAddressId}`, localAddressdata)
      .then(() => {
        alert("Local Address saved successfully!");
        resetLocal();
        onNext(loanid);
      })
      .catch((error) => {
        setErrorLocal("general", {
          type: "manual",
          message: "Error saving Local Address",
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Customer Address Form</h2>

      {customerAddressId && (
        <form onSubmit={handleSubmitPermanent(onSubmitPermanentAddress)}>
          <div className="mb-3">
            <label className="form-label">Area Name</label>
            <input
              type="text"
              className={`form-control ${
                errorsPermanent.areaname ? "is-invalid" : ""
              }`}
              {...registerPermanent("areaname", {
                required: "Area Name is required",
              })}
            />
            {errorsPermanent.areaname && (
              <div className="invalid-feedback">
                {errorsPermanent.areaname.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${
                errorsPermanent.cityname ? "is-invalid" : ""
              }`}
              {...registerPermanent("cityname", {
                required: "City is required",
              })}
            />
            {errorsPermanent.cityname && (
              <div className="invalid-feedback">
                {errorsPermanent.cityname.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">District</label>
            <input
              type="text"
              className={`form-control ${
                errorsPermanent.district ? "is-invalid" : ""
              }`}
              {...registerPermanent("district", {
                required: "District is required",
              })}
            />
            {errorsPermanent.district && (
              <div className="invalid-feedback">
                {errorsPermanent.district.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className={`form-control ${
                errorsPermanent.state ? "is-invalid" : ""
              }`}
              {...registerPermanent("state", {
                required: "State is required",
              })}
            />
            {errorsPermanent.state && (
              <div className="invalid-feedback">
                {errorsPermanent.state.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="number"
              className={`form-control ${
                errorsPermanent.pincode ? "is-invalid" : ""
              }`}
              {...registerPermanent("pincode", {
                required: "Pincode is required",
              })}
            />
            {errorsPermanent.pincode && (
              <div className="invalid-feedback">
                {errorsPermanent.pincode.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">House Number</label>
            <input
              type="number"
              className={`form-control ${
                errorsPermanent.houseNumber ? "is-invalid" : ""
              }`}
              {...registerPermanent("houseNumber", {
                required: "House Number is required",
              })}
            />
            {errorsPermanent.houseNumber && (
              <div className="invalid-feedback">
                {errorsPermanent.houseNumber.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Street Name</label>
            <input
              type="text"
              className={`form-control ${
                errorsPermanent.streetName ? "is-invalid" : ""
              }`}
              {...registerPermanent("streetName", {
                required: "Street Name is required",
              })}
            />
            {errorsPermanent.streetName && (
              <div className="invalid-feedback">
                {errorsPermanent.streetName.message}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit Permanent Address
          </button>
        </form>
      )}

      {/* Local Address Form */}
      {customerAddressId && (
        <form onSubmit={handleSubmitLocal(onSubmitLocalAddress)}>
          <div className="mb-3">
            <label className="form-label">Area Name</label>
            <input
              type="text"
              className={`form-control ${
                errorsLocal.areaname ? "is-invalid" : ""
              }`}
              {...registerLocal("areaname", {
                required: "Area Name is required",
              })}
            />
            {errorsLocal.areaname && (
              <div className="invalid-feedback">
                {errorsLocal.areaname.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className={`form-control ${
                errorsLocal.cityname ? "is-invalid" : ""
              }`}
              {...registerLocal("cityname", {
                required: "City is required",
              })}
            />
            {errorsLocal.cityname && (
              <div className="invalid-feedback">
                {errorsLocal.cityname.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">District</label>
            <input
              type="text"
              className={`form-control ${
                errorsLocal.district ? "is-invalid" : ""
              }`}
              {...registerLocal("district", {
                required: "District is required",
              })}
            />
            {errorsLocal.district && (
              <div className="invalid-feedback">
                {errorsLocal.district.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              className={`form-control ${
                errorsLocal.state ? "is-invalid" : ""
              }`}
              {...registerLocal("state", {
                required: "State is required",
              })}
            />
            {errorsLocal.state && (
              <div className="invalid-feedback">
                {errorsLocal.state.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Pincode</label>
            <input
              type="number"
              className={`form-control ${
                errorsLocal.pincode ? "is-invalid" : ""
              }`}
              {...registerLocal("pincode", {
                required: "Pincode is required",
              })}
            />
            {errorsLocal.pincode && (
              <div className="invalid-feedback">
                {errorsLocal.pincode.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">House Number</label>
            <input
              type="number"
              className={`form-control ${
                errorsLocal.houseNumber ? "is-invalid" : ""
              }`}
              {...registerLocal("houseNumber", {
                required: "House Number is required",
              })}
            />
            {errorsLocal.houseNumber && (
              <div className="invalid-feedback">
                {errorsLocal.houseNumber.message}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Street Name</label>
            <input
              type="text"
              className={`form-control ${
                errorsLocal.streetName ? "is-invalid" : ""
              }`}
              {...registerLocal("streetName", {
                required: "Street Name is required",
              })}
            />
            {errorsLocal.streetName && (
              <div className="invalid-feedback">
                {errorsLocal.streetName.message}
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Submit Local Address
          </button>
        </form>
      )}

      <div className="mt-3">
        {customerAddressId && (
          <>
            <button className="btn btn-secondary me-5" onClick={onBack}>
              Previous
            </button>
            <button className="btn btn-primary ml-2">Save and Next</button>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomerAddress;
