const JobList = ({ jobs, onEdit, onDelete, onViewApplications }) => {
  return (
    <div className="glass-card p-3">
      <h4 className="text-warning">Your Jobs</h4>
      {jobs.length === 0 ? (
        <p className="text-white">No jobs posted yet</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="d-flex justify-content-between align-items-center bg-dark text-white p-2 mb-2 rounded"
          >
            <div>
              <strong>{job.title}</strong> – {job.company} ({job.location}) |{" "}
              <span className="text-success">{job.salary}</span>
              <br />
              <small>{job.description}</small>
            </div>
            <div>
              <button
                className="btn btn-info btn-sm me-2"
                onClick={() => onEdit(job)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger btn-sm me-2"
                onClick={() => onDelete(job._id)}
              >
                Delete
              </button>
              <button
                className="btn btn-warning btn-sm"
                onClick={() => onViewApplications(job._id)}
              >
                Applications
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default JobList;
