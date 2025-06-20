import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import '../css/Home.css'; 

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="home-content">
          <h1>Selamat Datang di Sistem Multi-UMKM</h1>
          <p>
            Aplikasi ini membantu pelaku UMKM untuk mengelola produk, transaksi,
            dan laporan penjualan secara efisien. Sistem mendukung akses berbeda
            untuk admin UMKM dan kasir.
          </p>

          <div className="home-buttons">
            <Link to="/login" className="home-btn">Login</Link>
            <Link to="/register" className="home-btn">Daftar UMKM</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
