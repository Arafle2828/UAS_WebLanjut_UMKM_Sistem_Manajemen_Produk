import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [roleMode, setRoleMode] = useState('admin');

  const [form, setForm] = useState({
    email: '',
    password: '',
    id_umkm: ''
  });

  const [pesan, setPesan] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const body = roleMode === 'kasir'
        ? { email: form.email, password: form.password, id_umkm: form.id_umkm }
        : { email: form.email, password: form.password };

      const res = await axios.post('http://localhost:5000/api/auth/login', body);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userRole', res.data.user.role);
      localStorage.setItem('id_umkm', res.data.user.id_umkm);
      localStorage.setItem('id_user', res.data.user.id_user); 

      if (res.data.user.role === 'admin') navigate('/dashboard-admin');
      else navigate('/dashboard-kasir');
    } catch (err) {
      setPesan(err.response?.data?.message || 'Login gagal');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="login-container">
          <div className="login-header">
            <h2 className="login-title">Login Multi-UMKM</h2>
            <p className="login-subtitle">Silakan pilih role kemudian login</p>
          </div>

          {/* Role Switcher */}
          <div className="role-switcher">
            <button
              onClick={() => setRoleMode('admin')}
              className={`role-btn ${roleMode === 'admin' ? 'role-btn-active role-btn-admin' : 'role-btn-inactive'}`}
            >
              <span className="role-icon">👨‍💼</span>
              Login UMKM
            </button>
            <button
              onClick={() => setRoleMode('kasir')}
              className={`role-btn ${roleMode === 'kasir' ? 'role-btn-active role-btn-kasir' : 'role-btn-inactive'}`}
            >
              <span className="role-icon">👩‍💻</span>
              Login Kasir
            </button>
          </div>

          {pesan && (
            <div className="login-message login-message-error">
              <span className="message-icon">⚠️</span>
              {pesan}
            </div>
          )}

          {/* Form Login */}
          <form onSubmit={handleLogin} className="login-form">
            {roleMode === 'kasir' && (
              <div className="form-group">
                <input
                  type="text"
                  name="id_umkm"
                  placeholder="ID UMKM"
                  value={form.id_umkm}
                  onChange={handleChange}
                  required
                  className="login-input"
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="login-input"
              />
            </div>
            <button type="submit" className="login-submit-btn">
              <span className="btn-text">Login</span>
            </button>
          </form>

          <div className="login-footer">
            <p>Sistem Manajemen UMKM</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
