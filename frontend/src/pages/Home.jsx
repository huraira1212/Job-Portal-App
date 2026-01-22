import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-light">
      {/* Hero Section - Using Gradient Background Utility */}
      <section className="bg-primary bg-gradient text-white text-center py-5 shadow">
        <div className="container py-5">
          <h1 className="fw-bold display-5 mb-3">
            Find Your <span className="text-warning">Dream Job</span> 🚀
          </h1>
          <p className="lead mb-4 opacity-75">
            Search thousands of jobs from top companies in Pakistan & UAE
          </p>

          {/* Search Bar - Styled with Bootstrap utilities */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white p-2 rounded-3 shadow-lg d-flex flex-column flex-md-row gap-2">
                <input
                  type="text"
                  placeholder="🔍 Job title or keyword"
                  className="form-control border-0 shadow-none py-2"
                />
                <div className="vr d-none d-md-block mx-2"></div>
                <input
                  type="text"
                  placeholder="📍 Location"
                  className="form-control border-0 shadow-none py-2"
                />
                <button
                  className="btn btn-primary px-4 fw-bold"
                  onClick={() => navigate("/jobs")}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container py-5">
        <h2 className="fw-bold text-center mb-5">Browse Categories</h2>
        <div className="row g-4">
          {[
            "IT & Software",
            "AI & Data",
            "Marketing",
            "Web Design",
            "Sales",
            "Finance",
          ].map((cat, index) => (
            <div className="col-6 col-md-4 col-lg-2" key={index}>
              <div className="p-4 bg-white border rounded-4 text-center shadow-sm h-100 d-flex flex-column align-items-center justify-content-center">
                <div className="bg-light p-3 rounded-circle mb-3">
                  <i className="bi bi-briefcase text-primary"></i>{" "}
                  {/* Bootstrap Icons use kar sakte hain */}
                  💼
                </div>
                <h6 className="fw-bold mb-1">{cat}</h6>
                <small className="text-muted">150+ Openings</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="container py-5">
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h2 className="fw-bold mb-0">Featured Jobs</h2>
            <p className="text-muted mb-0">Hand-picked opportunities for you</p>
          </div>
          <button className="btn btn-outline-primary rounded-pill px-4">
            See All Jobs
          </button>
        </div>

        <div className="row g-4">
          {[1, 2, 3, 4].map((job) => (
            <div className="col-md-6 col-lg-3" key={job}>
              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                <div className="card-body p-4">
                  <div className="d-flex justify-content-between mb-3">
                    <span className="badge bg-success-soft text-success bg-opacity-10 py-2 px-3">
                      New Post
                    </span>
                    <button className="btn btn-link p-0 text-muted">
                      <i className="bi bi-bookmark"></i>
                    </button>
                  </div>
                  <h5 className="card-title fw-bold mb-1">Senior Developer</h5>
                  <p className="text-primary small fw-semibold mb-3">
                    Google Inc.
                  </p>

                  <div className="d-flex align-items-center text-muted mb-3 small">
                    <span className="me-3">📍 Karachi</span>
                    <span>💰 $2k - $3k</span>
                  </div>

                  <button className="btn btn-dark w-100 rounded-3 py-2 fw-bold mt-2">
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
