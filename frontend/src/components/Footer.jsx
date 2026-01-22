const Footer = () => {
  return (
    <footer className="footer-glass mt-auto">
      <div className="container py-4">
        <div className="row text-light">
          {/* BRAND */}
          <div className="col-md-4 mb-3">
            <h5 className="text-warning fw-bold">JobPortal</h5>
            <p className="small text-light opacity-75">
              Find your dream job and connect with top employers across
              Pakistan.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-md-4 mb-3">
            <h6 className="text-warning">Quick Links</h6>
            <ul className="list-unstyled small">
              <li>
                <a href="/" className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/jobs" className="footer-link">
                  Browse Jobs
                </a>
              </li>
              <li>
                <a href="/login" className="footer-link">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="footer-link">
                  Register
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-3">
            <h6 className="text-warning">Contact</h6>
            <p className="small mb-1">📧 hurirafaridawk@gmail.com</p>
            <p className="small mb-1">📞 +92 342 5474578</p>
            <p className="small">📍 Pakistan</p>
          </div>
        </div>

        <hr className="border-light opacity-25" />

        <p className="text-center small text-light opacity-75 mb-0">
          © {new Date().getFullYear()} JobPortal | Designed by Huraira 💙
        </p>
      </div>
    </footer>
  );
};

export default Footer;
