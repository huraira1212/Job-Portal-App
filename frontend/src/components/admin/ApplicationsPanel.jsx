const ApplicationsModal = ({
  show,
  job,
  applications = [],
  onStatusChange,
  onClose,
}) => {
  if (!show || !job) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">Applications – {job.title}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <p>
              <strong>Company:</strong> {job.company?.name}
              <br />
              <strong>Email:</strong> {job.company?.email}
            </p>

            <hr />

            {applications.length === 0 ? (
              <p>No applications found</p>
            ) : (
              applications.map((a) => (
                <div
                  key={a._id}
                  className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
                >
                  <div>
                    <strong>{a.user?.name}</strong>
                    <br />
                    <small>{a.user?.email}</small>
                  </div>

                  <select
                    className="form-select w-auto"
                    value={a.status}
                    onChange={(e) => onStatusChange(a._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;
