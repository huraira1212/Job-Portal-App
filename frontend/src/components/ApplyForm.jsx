import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const ApplyForm = ({ job, close, onSuccess }) => {
  const [name, setName] = useState(""); // ✅ Add name state
  const [email, setEmail] = useState(""); // ✅ Add email state (optional)
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Optional: prefill name and email if user info is stored in localStorage
  useEffect(() => {
    const userName = localStorage.getItem("userName") || "";
    const userEmail = localStorage.getItem("userEmail") || "";
    setName(userName);
    setEmail(userEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name.trim()) {
      setError("Name cannot be empty.");
      return;
    }

    if (!coverLetter.trim()) {
      setError("Cover letter cannot be empty.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to apply.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("jobId", job._id);
      formData.append("name", name); // ✅ Add name
      formData.append("email", email); // ✅ Add email
      formData.append("coverLetter", coverLetter);
      if (resume) formData.append("resume", resume);

      await axios.post("http://localhost:5000/api/applications", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setSuccess("Applied Successfully 🎉");
      onSuccess?.();
      setTimeout(() => close?.(), 1200);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Apply failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-modal fade-up">
        <button
          onClick={close}
          className="btn-close btn-close-white modal-close"
        ></button>

        <h5 className="text-warning mb-3 text-center">
          Apply for {job?.title || "this job"}
        </h5>

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-3">
            <label className="text-light small">Name</label>
            <input
              type="text"
              className="form-control form-dark"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="text-light small">Email</label>
            <input
              type="email"
              className="form-control form-dark"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
            />
          </div>

          {/* Cover Letter */}
          <div className="mb-3">
            <label className="text-light small">Cover Letter</label>
            <textarea
              className="form-control form-dark"
              rows={4}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Write your cover letter here..."
              required
            />
          </div>

          {/* Resume */}
          <div className="mb-3">
            <label className="text-light small">Upload Resume</label>
            <input
              type="file"
              className="form-control form-dark"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files[0])}
            />
            {resume && (
              <p className="text-muted small mt-1">
                Selected file: {resume.name}
              </p>
            )}
          </div>

          {error && <p className="text-danger text-center small">{error}</p>}
          {success && (
            <p className="text-success text-center small">{success}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-gradient w-100 fw-bold"
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
