import { useState, useEffect } from "react";
import axios from "axios";
import JobForm from "./JobForm";
import JobList from "./JobList";
import ApplicationsList from "./ApplicationsList";

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) fetchEmployerJobs();
  }, [token]);

  const fetchEmployerJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/my-jobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to load jobs ❌", type: "danger" });
    }
  };

  const handleSubmitJob = async (jobData) => {
    if (!token) {
      setMessage({ text: "Please login first ❗", type: "danger" });
      return;
    }
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      if (editingJob) {
        await axios.put(
          `http://localhost:5000/api/jobs/${editingJob._id}`,
          jobData,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setMessage({ text: "Job updated successfully ✅", type: "success" });
      } else {
        await axios.post("http://localhost:5000/api/jobs", jobData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessage({ text: "Job posted successfully 🎉", type: "success" });
      }
      setEditingJob(null);
      fetchEmployerJobs();
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.message || "Operation failed ❌",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage({ text: "Job deleted ✅", type: "success" });
      fetchEmployerJobs();
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to delete job ❌", type: "danger" });
    }
  };

  const handleViewApplications = async (jobId) => {
    setSelectedJobId(jobId);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/job/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setApplications(res.data);
    } catch (err) {
      console.error(err);
      setApplications([]);
      setMessage({ text: "Failed to load applications ❌", type: "danger" });
    }
  };

  const handleUpdateApplicationStatus = async (appId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/applications/${appId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setApplications((prev) =>
        prev.map((app) => (app._id === appId ? { ...app, status } : app)),
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status ❌");
    }
  };

  return (
    <div className="dashboard-bg py-5">
      <div className="container">
        <h2 className="text-center text-white fw-bold mb-4">
          Employer Dashboard
        </h2>

        <JobForm
          token={token}
          editingJob={editingJob}
          onSubmit={handleSubmitJob}
          onReset={() => setEditingJob(null)}
          message={message}
          loading={loading}
        />

        <JobList
          jobs={jobs}
          onEdit={setEditingJob}
          onDelete={handleDeleteJob}
          onViewApplications={handleViewApplications}
        />

        {selectedJobId && (
          <ApplicationsList
            applications={applications}
            onUpdateStatus={handleUpdateApplicationStatus}
          />
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
