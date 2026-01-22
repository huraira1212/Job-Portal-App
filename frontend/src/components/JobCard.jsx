import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApplyForm from "./ApplyForm";
import "../App.css";

const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [applied, setApplied] = useState(false);
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);

  const handleApplyClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to apply");
      navigate("/login");
      return;
    }
    setShowForm(true);
  };

  const handleReadMoreClick = () => {
    setShowDescriptionModal(true);
  };

  const description = job.description || "";

  return (
    <>
      {/* ===== JOB CARD ===== */}
      <div className="col-md-4 mb-4">
        <div
          className="job-card h-100 p-3 d-flex flex-column"
          style={{
            backgroundColor: "#1e1e2f",
            borderRadius: "10px",
            color: "#f8f9fa",
          }}
        >
          <h5 className="fw-bold text-warning">{job.title}</h5>

          {/* Short description with Read More */}
          <p
            style={{
              whiteSpace: "pre-line",
              color: "#e0e0e0",
              fontSize: "0.9rem",
            }}
          >
            {description.length > 100
              ? description.slice(0, 100) + "..."
              : description}
            {description.length > 100 && (
              <span
                onClick={handleReadMoreClick}
                style={{
                  cursor: "pointer",
                  color: "#ffc107",
                  marginLeft: "5px",
                }}
              >
                Read More
              </span>
            )}
          </p>

          <p style={{ color: "#17a2b8", marginBottom: "4px" }}>
            <b>Company:</b> {job.company}
          </p>
          <p style={{ color: "#adb5bd", marginBottom: "4px" }}>
            <b>Location:</b> {job.location} | <b>Salary:</b> {job.salary}
          </p>

          <button
            onClick={handleApplyClick}
            className="btn btn-gradient mt-auto"
            disabled={applied}
          >
            {applied ? "Applied ✅" : "Apply Now"}
          </button>
        </div>
      </div>

      {/* ===== APPLY FORM MODAL ===== */}
      {showForm && (
        <ApplyForm
          job={job}
          close={() => setShowForm(false)}
          onSuccess={() => setApplied(true)}
        />
      )}

      {/* ===== DESCRIPTION POPUP MODAL ===== */}
      {showDescriptionModal && (
        <div
          className="modal-overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            overflowY: "auto", // allows scrolling if content is long
            padding: "20px", // spacing around modal
          }}
          onClick={() => setShowDescriptionModal(false)}
        >
          <div
            className="modal-card p-4"
            style={{
              backgroundColor: "#1e1e2f",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "80vh", // max height 80% of viewport
              color: "#f8f9fa",
              overflowY: "auto", // scroll inside modal if content too long
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
          >
            <h5 className="fw-bold text-warning mb-3">{job.title}</h5>
            <p style={{ whiteSpace: "pre-line", marginBottom: "12px" }}>
              {description}
            </p>
            <p style={{ color: "#17a2b8", marginBottom: "4px" }}>
              <b>Company:</b> {job.company}
            </p>
            <p style={{ color: "#adb5bd", marginBottom: "12px" }}>
              <b>Location:</b> {job.location} | <b>Salary:</b> {job.salary}
            </p>
            <button
              className="btn btn-secondary"
              onClick={() => setShowDescriptionModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
