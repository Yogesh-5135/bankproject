import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ViewSanction({ enquiry }) {
  const [viewSanctionletter, setViewSanctionLetter] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!enquiry?.customerid) return;
    axios
      .get(
        `http://localhost:9099/api/v3/getSanctionLetter/${enquiry?.customerid}`
      )
      .then((response) => {
        setViewSanctionLetter(response.data.sanctionLetter);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching sanction letter data:", error);
        setLoading(false);
      });
  }, [enquiry?.customerid]);

  const handleAccepted = () => {
    if (enquiry?.customerid) {
      axios
        .put(`http://localhost:9099/api/v3/add/Accepted/${enquiry?.customerid}`)
        .then((response) => {
          console.log("Loan status changed to Accepted.");
          navigate("/bankloan/customerlayout");
        })
        .catch((error) => {
          console.error("Error updating loan status:", error);
        });
    }
  };

  const handleRejected = () => {
    if (enquiry?.customerid) {
      axios
        .put(`http://localhost:9099/api/v3/add/Rejected/${enquiry?.customerid}`)
        .then((response) => {
          console.log("Loan status changed to Rejected.");
          navigate("/bankloan/customerlayout");
        })
        .catch((error) => {
          console.error("Error updating loan status:", error);
        });
    }
  };

  if (loading) {
    return <div>Loading..</div>;
  }

  if (!viewSanctionletter) {
    return <div>No sanction letter found.</div>;
  }

  return (
    <div>
      <h2 className="text-center mt-2 ms-2 me-2">Sanction Letter</h2>
      <iframe
        src={`data:application/pdf;base64,${viewSanctionletter}`}
        width="100%"
        height="600px"
        title="Sanction Letter"
      ></iframe>

      <div className="mt-4 text-center">
        <button
          onClick={handleAccepted}
          className="btn btn-success mx-2"
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Accepted
        </button>
        <button
          onClick={handleRejected}
          className="btn btn-danger mx-2"
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Rejected
        </button>
      </div>
    </div>
  );
}
