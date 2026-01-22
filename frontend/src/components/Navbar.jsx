import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  // ------------------------------
  // STATE
  // ------------------------------
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // ------------------------------
  // GET TOKEN & USER
  // ------------------------------
  useEffect(() => {
    const t = localStorage.getItem("token");
    const u = localStorage.getItem("user");
    setToken(t);

    try {
      setUser(u ? JSON.parse(u) : null);
    } catch (err) {
      console.error("Invalid user in localStorage", err);
      setUser(null);
    }
  }, []);

  // ------------------------------
  // LOGOUT
  // ------------------------------
  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    navigate("/login");
  };

  // ------------------------------
  // CLOSE MOBILE NAV AFTER CLICK
  // ------------------------------
  const closeMobileMenu = () => {
    const nav = document.getElementById("navbarNav");
    if (nav?.classList.contains("show")) {
      nav.classList.remove("show");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top py-3">
      <div className="container">
        {/* BRAND */}
        <Link
          className="navbar-brand fw-bold text-primary d-flex align-items-center gap-2 fs-4"
          to={
            user?.role === "admin"
              ? "/admin-dashboard"
              : user?.role === "employer"
                ? "/employer-dashboard"
                : "/"
          }
        >
          <span className="bg-primary text-white px-2 py-1 rounded-3">J</span>
          <span>JobPortal</span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-3">
            {(!token || user?.role === "jobseeker") && (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3"
                    to="/"
                    onClick={closeMobileMenu}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link fw-semibold px-3"
                    to="/jobs"
                    onClick={closeMobileMenu}
                  >
                    Browse Jobs
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* RIGHT SIDE BUTTONS */}
          <div className="d-flex align-items-center gap-2 flex-wrap">
            {!token ? (
              <>
                <Link
                  className="btn btn-light fw-semibold text-primary px-4 rounded-pill"
                  to="/login"
                  onClick={closeMobileMenu}
                >
                  Sign In
                </Link>
                <Link
                  className="btn btn-primary fw-semibold px-4 rounded-pill shadow-sm"
                  to="/register"
                  onClick={closeMobileMenu}
                >
                  Join Now
                </Link>
              </>
            ) : (
              <div className="d-flex align-items-center gap-3 flex-wrap">
                {/* Admin / Employer / Jobseeker Buttons */}
                {user?.role === "admin" && (
                  <Link
                    className="btn btn-danger btn-sm rounded-pill px-3 fw-bold shadow-sm"
                    to="/admin-dashboard"
                    onClick={closeMobileMenu}
                  >
                    Admin Portal
                  </Link>
                )}

                {user?.role === "employer" && (
                  <Link
                    className="btn btn-warning btn-sm rounded-pill px-3 fw-bold shadow-sm text-dark"
                    to="/employer-dashboard"
                    onClick={closeMobileMenu}
                  >
                    Post a Job
                  </Link>
                )}

                {user?.role === "jobseeker" && (
                  <div className="d-none d-md-block text-end">
                    <small className="text-muted d-block">Logged in as</small>
                    <span className="fw-bold text-dark small">
                      {user?.name || "Candidate"}
                    </span>
                  </div>
                )}

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="btn btn-outline-danger btn-sm rounded-pill px-3 fw-semibold"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
