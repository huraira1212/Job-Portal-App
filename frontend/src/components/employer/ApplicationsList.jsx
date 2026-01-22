import { useState } from "react";
import "./ApplicationsList.css";

const ApplicationsList = ({ applications = [], onUpdateStatus }) => {
  const [selectedApp, setSelectedApp] = useState(null);

  if (!applications || applications.length === 0)
    return <p className="text-white">No applications yet</p>;

  return (
    <div className="glass-card mt-4 p-3">
      <h4 className="text-warning">Applications</h4>

      {applications.map((app) => (
        <div
          key={app._id}
          className="d-flex justify-content-between bg-secondary text-white p-2 mb-2 rounded"
        >
          <div>
            <strong>{app.name || app.user?.name}</strong> –{" "}
            {app.email || app.user?.email}
          </div>

          <div className="d-flex align-items-center">
            {/* Status Selector */}
            <select
              className="form-select form-select-sm w-auto me-2"
              value={app.status}
              onChange={(e) => onUpdateStatus(app._id, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              className="btn btn-info btn-sm"
              onClick={() => setSelectedApp(app)}
            >
              View Details
            </button>
          </div>
        </div>
      ))}

      {/* ============ MODAL ============ */}
      {selectedApp && (
        <>
          <div
            className="modal-overlay"
            onClick={() => setSelectedApp(null)}
          ></div>

          <div className="modal-content-custom">
            <div className="modal-header">
              <h5 className="modal-title">Candidate Details</h5>
              <button
                className="btn-close"
                onClick={() => setSelectedApp(null)}
              ></button>
            </div>

            <div className="modal-body text-dark">
              <p>
                <b>Name:</b> {selectedApp.name || selectedApp.user?.name}
              </p>
              <p>
                <b>Email:</b> {selectedApp.email || selectedApp.user?.email}
              </p>

              <p>
                <b>Cover Letter:</b>
              </p>
              <p>{selectedApp.coverLetter || "No cover letter provided"}</p>

              <p>
                <b>Resume:</b>{" "}
                {selectedApp.resume ? (
                  <a
                    href={`http://localhost:5000${selectedApp.resume.replace(
                      /\\/g,
                      "/",
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </a>
                ) : (
                  "No Resume Uploaded"
                )}
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ApplicationsList;
