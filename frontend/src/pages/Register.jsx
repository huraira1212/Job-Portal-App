import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "jobseeker",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form, {
        headers: { "Content-Type": "application/json" },
      });

      alert("Registered Successfully ✅ Please Login");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
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
        <h2 className="text-center mb-3 text-warning">Create Account</h2>
        <p className="text-center text-light mb-4">
          Register now and start your journey
        </p>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              className="form-control bg-secondary text-white border-0"
              style={{ boxShadow: "0 0 8px yellow" }}
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <input
              className="form-control bg-secondary text-white border-0"
              style={{ boxShadow: "0 0 8px yellow" }}
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <select
              className="form-select bg-secondary text-white border-0"
              style={{ boxShadow: "0 0 8px yellow" }}
              name="role"
              value={form.role}
              onChange={handleChange}
            >
        
              <option value="jobseeker">Candidate</option>
              <option value="employer">Company</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="password"
              className="form-control bg-secondary text-white border-0"
              style={{ boxShadow: "0 0 8px yellow" }}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100 fw-bold text-white"
            style={{
              background: "linear-gradient(90deg, red, yellow, green)",
              boxShadow: "0 0 10px #fff",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="btn btn-link text-warning"
            onClick={() => navigate("/login")}
          >
            Already have an account? Login
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

export default Register;
