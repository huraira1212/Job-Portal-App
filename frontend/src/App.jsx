import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Jobs";
import EmployerDashboard from "./components/employer/EmployerDashboard";
import Footer from "./components/Footer";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
    <Router>
      {/* Navbar will show on every page */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        {/* Admin Route */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
