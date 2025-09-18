import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardKasir from './pages/DashboardKasir';
import ReportPage from './pages/ReportPage';
import ManageKasir from './pages/ManageKasir';
import Home from './pages/Home';
import About from './pages/About';
import Profile from './pages/Profile';

const AppRoutes = () => {
  return (
    <Routes>
      {/* ✅ Tambahkan redirect atau tampilan awal */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard-admin" element={<DashboardAdmin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/dashboard-kasir" element={<DashboardKasir />} />
      <Route path="/laporan" element={<ReportPage />} />
      <Route path="/manage-kasir" element={<ManageKasir />} />
    </Routes>
  );
};

export default AppRoutes;
