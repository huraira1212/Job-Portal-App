import { useState, useEffect } from "react";
import axios from "axios";

import AdminTabs from "./AdminTabs";
import JobsTable from "./JobsTable";
import UsersTable from "./UsersTable";
import ApplicationsPanel from "./ApplicationsPanel";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);

  const token = localStorage.getItem("token");
  const authHeader = { headers: { Authorization: `Bearer ${token}` } };

  // ================= FETCH =================
  const fetchJobs = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/jobs",
      authHeader,
    );
    setJobs(res.data || []);
  };

  const fetchUsers = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/admin/users",
      authHeader,
    );
    const users = res.data || [];
    setCandidates(users.filter((u) => u.role === "jobseeker"));
    setCompanies(users.filter((u) => u.role === "employer"));
  };

  const fetchApplications = async (jobId) => {
    const res = await axios.get(
      `http://localhost:5000/api/applications/job/${jobId}`,
      authHeader,
    );
    setApplications(res.data || []);
    setSelectedJobId(jobId);
  };

  useEffect(() => {
    fetchJobs();
    fetchUsers();
  }, []);

  // ================= ACTIONS =================
  const toggleBlock = async (id) => {
    await axios.put(
      `http://localhost:5000/api/admin/user/${id}/block`,
      {},
      authHeader,
    );
    fetchUsers();
  };

  const approveJob = async (id) => {
    await axios.put(
      `http://localhost:5000/api/admin/job/${id}/approve`,
      {},
      authHeader,
    );
    fetchJobs();
  };

  const rejectJob = async (id) => {
    await axios.put(
      `http://localhost:5000/api/admin/job/${id}/reject`,
      {},
      authHeader,
    );
    fetchJobs();
  };

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    await axios.delete(`http://localhost:5000/api/admin/job/${id}`, authHeader);
    fetchJobs();
  };

  const updateApplicationStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/admin/application/${id}`,
      { status },
      authHeader,
    );
    fetchApplications(selectedJobId);
  };

  return (
    <div className="container mt-4">
      <h3>Admin Dashboard</h3>

      <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "jobs" && (
        <JobsTable
          jobs={jobs}
          onApprove={approveJob}
          onReject={rejectJob}
          onDelete={deleteJob}
          onViewApplications={fetchApplications}
        />
      )}

      {activeTab === "candidates" && (
        <UsersTable users={candidates} onToggleBlock={toggleBlock} />
      )}

      {activeTab === "companies" && (
        <UsersTable users={companies} onToggleBlock={toggleBlock} />
      )}

      {selectedJobId && (
        <ApplicationsPanel
          applications={applications}
          onStatusChange={updateApplicationStatus}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
