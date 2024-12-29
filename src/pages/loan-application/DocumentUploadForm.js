import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const DocumentUploadForm = ({ loanid, onNext, onBack }) => {
  const { register, handleSubmit } = useForm();
  const baseURL = "http://localhost:9090";

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("ap", data.addressProof[0]);
    formData.append("pc", data.panCard[0]);
    formData.append("it", data.incomeTax[0]);
    formData.append("ac", data.aadharCard[0]);
    formData.append("ph", data.photo[0]);
    formData.append("sig", data.signature[0]);
    formData.append("bc", data.bankCheque[0]);
    formData.append("ss", data.salarySlips[0]);

    axios
      .post(`${baseURL}/saveDocuments/${loanid}`, formData)
      .then(() => {
        console.log("Documents uploaded successfully!");
        onNext(loanid);
      })
      .catch((error) => {
        console.error("Error uploading documents", error);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Upload Documents</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Address Proof</label>
          <input
            type="file"
            className="form-control"
            {...register("addressProof", {
              required: "Address proof is required",
            })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">PAN Card</label>
          <input
            type="file"
            className="form-control"
            {...register("panCard", { required: "PAN card is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Income Tax</label>
          <input
            type="file"
            className="form-control"
            {...register("incomeTax", { required: "Income tax is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Aadhar Card</label>
          <input
            type="file"
            className="form-control"
            {...register("aadharCard", { required: "Aadhar card is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Photograph</label>
          <input
            type="file"
            className="form-control"
            {...register("photo", { required: "Photograph is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Signature</label>
          <input
            type="file"
            className="form-control"
            {...register("signature", { required: "Signature is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bank Cheque</label>
          <input
            type="file"
            className="form-control"
            {...register("bankCheque", { required: "Bank cheque is required" })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Salary Slips</label>
          <input
            type="file"
            className="form-control"
            {...register("salarySlips", {
              required: "Salary slips are required",
            })}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Upload and Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUploadForm;
