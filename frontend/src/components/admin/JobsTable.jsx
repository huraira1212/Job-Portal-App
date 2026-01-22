const JobsTable = ({
  jobs = [],
  onApprove,
  onReject,
  onDelete,
  onViewApplications,
}) => {
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return <p className="text-center mt-3">No jobs found</p>;
  }

  // 🔴 Delete confirmation
  const handleDelete = (jobId, title) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this job?\n\nJob: ${title}\n\nAll applications will also be deleted.`,
    );

    if (confirmDelete) {
      onDelete(jobId);
    }
  };

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>Title</th>
          <th>Company</th>
          <th>Status</th>
          <th>Applications</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {jobs.map((job) => (
          <tr key={job._id}>
            {/* Job Title */}
            <td>{job.title || "N/A"}</td>

            {/* Company */}
            <td>
              {job.company && typeof job.company === "object" ? (
                <>
                  <strong>{job.company.name}</strong>
                  <br />
                  <small>{job.company.email}</small>
                </>
              ) : (
                <span className="text-muted">Not available</span>
              )}
            </td>

            {/* Status */}
            <td>
              <span
                className={`badge ${
                  job.status === "approved"
                    ? "bg-success"
                    : job.status === "rejected"
                      ? "bg-danger"
                      : "bg-warning"
                }`}
              >
                {job.status ?? "pending"}
              </span>
            </td>

            {/* Applications */}
            <td>
              {job.applicationCount ?? 0}
              <button
                type="button"
                className="btn btn-sm btn-info ms-2"
                onClick={() => onViewApplications(job._id)}
              >
                View
              </button>
            </td>

            {/* Actions */}
            <td className="d-flex gap-1">
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => onApprove(job._id)}
              >
                Approve
              </button>

              <button
                type="button"
                className="btn btn-sm btn-warning"
                onClick={() => onReject(job._id)}
              >
                Reject
              </button>

              <button
                type="button"
                className="btn btn-sm btn-danger"
                onClick={() => handleDelete(job._id, job.title)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default JobsTable;
