import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/Profile.css';

const Profile = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');
  const id_umkm = localStorage.getItem('id_umkm');
  const id_user = localStorage.getItem('id_user');

  const [pesan, setPesan] = useState('');
  const [showPopup, setShowPopup] = useState(false); // ✅ untuk notifikasi pop-up

  const [data, setData] = useState({
    nama_umkm: '',
    alamat: '',
    telepon: ''
  });

  const [userAuth, setUserAuth] = useState({
    email: '',
    password: ''
  });

  // Ambil data UMKM
  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/umkm/${id_umkm}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        setPesan('Gagal memuat data UMKM');
      }
    };

    fetchUMKM();
  }, [id_umkm, token]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const showSuccessPopup = (message) => {
    setPesan(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setPesan('');
    }, 2500);
  };

  const handleUpdateUMKM = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/umkm/${id_umkm}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccessPopup(res.data.message);
    } catch (err) {
      showSuccessPopup('Gagal memperbarui data UMKM');
    }
  };

  const handleUpdateAuth = async () => {
    if (!userAuth.email || !userAuth.password) {
      showSuccessPopup('Email dan password tidak boleh kosong');
      return;
    }

    try {
      const res = await axios.put(`http://localhost:5000/api/user/${id_user}`, userAuth, {
        headers: { Authorization: `Bearer ${token}` }
      });
      showSuccessPopup(res.data.message);
      setUserAuth({ email: '', password: '' });
    } catch (err) {
      showSuccessPopup(err.response?.data?.message || 'Gagal update email/password');
    }
  };

  return (
    <>
      <Navbar />

      {/* ✅ Popup floating */}
      {showPopup && (
        <div className="popup-success">
          {pesan}
        </div>
      )}

      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            <img src="/user-icon.png" alt="User" />
          </div>
          <h2 className="profile-name">{data.nama_umkm}</h2>
          <p className="profile-role">{role?.toUpperCase()}</p>
          <p className="profile-id">ID UMKM: <strong>{id_umkm}</strong></p>
        </div>

        <form className="profile-form" onSubmit={handleUpdateUMKM}>
          <input
            type="text"
            name="nama_umkm"
            value={data.nama_umkm}
            onChange={handleChange}
            className="profile-input"
            placeholder="Nama UMKM"
            disabled={role === 'kasir'}
          />
          <input
            type="text"
            name="alamat"
            value={data.alamat}
            onChange={handleChange}
            className="profile-input"
            placeholder="Alamat"
            disabled={role === 'kasir'}
          />
          <input
            type="text"
            name="telepon"
            value={data.telepon}
            onChange={handleChange}
            className="profile-input"
            placeholder="Telepon"
            disabled={role === 'kasir'}
          />
          {role === 'admin' && (
            <button type="submit" className="profile-button">Simpan Perubahan UMKM</button>
          )}
        </form>

        <div className="auth-section">
          <h3 className="profile-subtitle">Ubah Akun Login</h3>
          <input
            type="email"
            name="email"
            placeholder="Email baru"
            value={userAuth.email}
            onChange={(e) => setUserAuth({ ...userAuth, email: e.target.value })}
            className="profile-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password baru"
            value={userAuth.password}
            onChange={(e) => setUserAuth({ ...userAuth, password: e.target.value })}
            className="profile-input"
          />
          <button type="button" className="profile-button" onClick={handleUpdateAuth}>
            Simpan Perubahan Akun
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
