import { useEffect, useState } from "react";
import axios from "axios";

const MyApplications = () => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "http://localhost:5000/api/applications/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setApps(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApps();
  }, []);

  if (loading) return <p className="mt-4">Loading applications...</p>;
  if (error) return <p className="mt-4 text-danger">{error}</p>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">My Applications</h3>

      {apps.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        apps.map((a) => (
          <div key={a._id} className="card mb-3 shadow-sm">
            <div className="card-body">
              <h5>{a.job.title}</h5>
              <p>
                {a.job.company} — {a.job.location}
              </p>
              <span className="badge bg-warning text-dark">{a.status}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyApplications;
