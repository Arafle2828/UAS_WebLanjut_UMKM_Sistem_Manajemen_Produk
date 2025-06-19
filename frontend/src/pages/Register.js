import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // ✅ Tambahkan Navbar
import '../css/Register.css';

const Register = () => {
  const [form, setForm] = useState({
    nama_umkm: '',
    alamat: '',
    telepon: '',
    nama_lengkap: '',
    email: '',
    password: ''
  });

  const [pesan, setPesan] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);
      setPesan(res.data.message);
    } catch (err) {
      setPesan(err.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar tampil di atas */}
      <div className="register-container">
        <h2 className="register-title">Registrasi Multi-UMKM</h2>
        <p className="register-subtitle">Silakan lengkapi data untuk mendaftar</p>
        {pesan && <p className="register-message">{pesan}</p>}
      <form className="register-form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="nama_umkm" 
          placeholder="Nama UMKM" 
          className="register-input"
          onChange={handleChange} 
          required 
        />
        <input 
          type="text" 
          name="alamat" 
          placeholder="Alamat" 
          className="register-input"
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="telepon" 
          placeholder="Telepon" 
          className="register-input"
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="nama_lengkap" 
          placeholder="Nama Admin" 
          className="register-input"
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          className="register-input"
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="register-input"
          onChange={handleChange} 
          required 
        />
        <button type="submit" className="register-button">Daftar</button>
      </form>
      <div className="register-footer">
        Sistem Manajemen UMKM
      </div>
    </div>
    </>
  );
};

export default Register;