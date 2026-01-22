import { useState, useEffect } from "react";

const JobForm = ({
  token,
  editingJob,
  onSubmit,
  onReset,
  message,
  loading,
}) => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  useEffect(() => {
    if (editingJob) setJob(editingJob);
  }, [editingJob]);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(job);
  };

  const handleReset = () => {
    setJob({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
    onReset();
  };

  return (
    <div className="glass-card mx-auto mb-4 p-4">
      <h4 className="text-warning text-center">
        {editingJob ? "Edit Job" : "Post New Job"}
      </h4>

      {message.text && (
        <div className={`alert alert-${message.type} text-center`}>
          {message.text}
        </div>
      )}

      <div className="row g-3">
        {["title", "company", "location", "salary"].map((field) => (
          <div key={field} className="col-md-6">
            <input
              name={field}
              value={job[field]}
              onChange={handleChange}
              className="form-control"
              placeholder={field.toUpperCase()}
            />
          </div>
        ))}
        <div className="col-12">
          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            className="form-control"
            rows={4}
            placeholder="Job Description"
          />
        </div>
      </div>

      <div className="text-center mt-3">
        <button
          onClick={handleSubmit}
          className="btn btn-success px-4"
          disabled={loading}
        >
          {loading ? "Processing..." : editingJob ? "Update Job" : "Post Job"}
        </button>
        {editingJob && (
          <button onClick={handleReset} className="btn btn-secondary ms-2">
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default JobForm;
