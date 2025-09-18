import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/ManageKasir.css'; // Import CSS file

const ManageKasir = () => {
  const [form, setForm] = useState({
    nama_lengkap: '',
    email: '',
    password: ''
  });
  const [pesan, setPesan] = useState('');
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/user/tambah-kasir', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPesan(res.data.message);
      setForm({ nama_lengkap: '', email: '', password: '' });
    } catch (err) {
      setPesan(err.response?.data?.message || 'Gagal menambah kasir');
    }
  };

  return (
    <>
      <Navbar />
      <div className="manage-kasir-container">
        <div className="manage-kasir-form-wrapper">
          <h2 className="manage-kasir-title">Tambah Kasir Baru</h2>
          {pesan && (
            <p className={`manage-kasir-message ${pesan.includes('Gagal') ? 'error' : ''}`}>
              {pesan}
            </p>
          )}
          <form className="manage-kasir-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="nama_lengkap" 
              value={form.nama_lengkap}
              placeholder="Nama Kasir" 
              onChange={handleChange} 
              className="manage-kasir-input"
              required 
            />
            <input 
              type="email" 
              name="email" 
              value={form.email}
              placeholder="Email Kasir" 
              onChange={handleChange} 
              className="manage-kasir-input"
              required 
            />
            <input 
              type="password" 
              name="password" 
              value={form.password}
              placeholder="Password" 
              onChange={handleChange} 
              className="manage-kasir-input"
              required 
            />
            <button type="submit" className="manage-kasir-button">
              Tambah Kasir
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ManageKasir;