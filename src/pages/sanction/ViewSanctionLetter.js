import React from "react";
import { useLocation } from "react-router-dom";

export default function ViewSanctionLetter() {
  const location = useLocation();
  const { sanction } = location.state || {};

  if (!sanction) {
    return <div>No sanction letter available.</div>;
  }

  const downloadFile = () => {
    const link = document.createElement("a");
    link.href = `data:application/pdf;base64,${sanction.sanctionLetter}`;
    link.download = "SanctionLetter.pdf";
    link.click();
  };

  return (
    <div>
      <h2>Sanction Letter</h2>
      <button onClick={downloadFile} className="btn btn-primary">
        Download Sanction Letter
      </button>

      <iframe
        src={`data:application/pdf;base64,${sanction.sanctionLetter}`}
        width="100%"
        height="600px"
        title="Sanction Letter"
      ></iframe>
    </div>
  );
}
