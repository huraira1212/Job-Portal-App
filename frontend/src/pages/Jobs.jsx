import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 login check first
    if (!token) {
      navigate("/login");
      return;
    }

    // 📦 then fetch jobs
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [navigate]);

  if (loading) return <p className="text-center mt-5">Loading jobs...</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Available Jobs</h3>
      {jobs.length === 0 ? (
        <p>No jobs available yet.</p>
      ) : (
        <div className="row">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
