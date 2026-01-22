import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "admin@jobportal.com";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form,
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Detect ADMIN by email
      const userData = {
        ...res.data,
        role: form.email === ADMIN_EMAIL ? "admin" : res.data.role,
      };

      // Save user
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect logic
      if (form.email === ADMIN_EMAIL) {
        navigate("/admin-dashboard");
      } else if (userData.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/jobs");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, black, red, green, yellow)",
        backgroundSize: "400% 400%",
        animation: "gradientBG 15s ease infinite",
      }}
    >
      <div
        className="card text-white bg-dark p-5 rounded-4 shadow-lg"
        style={{ minWidth: "350px" }}
      >
        <h2 className="text-center mb-3 text-warning">Welcome Back!</h2>
        <p className="text-center text-light mb-4">
          Login to your account and explore opportunities
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control bg-secondary text-white border-0"
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="form-control bg-secondary text-white border-0"
            />
          </div>

          <button
            type="submit"
            className="btn w-100 text-white fw-bold"
            style={{
              background: "linear-gradient(90deg, red, yellow, green)",
            }}
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            className="btn btn-link text-warning"
            onClick={() => navigate("/register")}
          >
            Don't have an account? Register
          </button>
        </div>
      </div>

      <style>
        {`
          @keyframes gradientBG {
            0% {background-position: 0% 50%;}
            50% {background-position: 100% 50%;}
            100% {background-position: 0% 50%;}
          }
        `}
      </style>
    </div>
  );
};

export default Login;
