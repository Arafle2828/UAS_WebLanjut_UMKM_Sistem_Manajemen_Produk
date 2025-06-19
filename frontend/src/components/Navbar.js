import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">MULTI UMKM</div>

      <div className="navbar-nav">
        {!token ? (
          <>
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/about" className="navbar-link">About</Link>
            <Link to="/login" className="navbar-link">Login</Link>
            <Link to="/register" className="navbar-link">Register</Link>
          </>
        ) : (
          <>
            {role === 'admin' && (
              <>
                <Link to="/dashboard-admin" className="navbar-link">Produk</Link>
                <Link to="/laporan" className="navbar-link">Laporan</Link>
                <Link to="/manage-kasir" className="navbar-link">Tambah Kasir</Link>
              </>
            )}
            {role === 'kasir' && (
              <>
                <Link to="/dashboard-kasir" className="navbar-link">Kasir</Link>
                <Link to="/dashboard-admin" className="navbar-link">Produk</Link>
              </>
            )}
            {/* ✅ Link ke Profil (admin dan kasir) */}
            <Link to="/profile" className="navbar-link">Profil</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
