import React from 'react';
import Navbar from '../components/Navbar';
import '../css/About.css';

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <div className="about-content">
          <h1>Tentang Aplikasi Multi-UMKM</h1>
          <p>
            <strong>Multi-UMKM</strong> adalah sebuah sistem manajemen terintegrasi yang dirancang khusus
            untuk membantu pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) dalam mengelola produk,
            transaksi penjualan, dan laporan keuangan secara efisien dan profesional.
          </p>

          <h2>Tujuan</h2>
          <p>
            Aplikasi ini bertujuan untuk memberikan solusi digital kepada UMKM agar dapat bersaing
            di era transformasi digital dengan mempermudah proses administrasi dan operasional harian.
          </p>

          <h2>Fitur Utama</h2>
          <ul>
            <li> Pengelolaan data produk (tambah, edit, hapus produk)</li>
            <li> Sistem login berbasis role (admin UMKM dan kasir)</li>
            <li> Transaksi penjualan dengan metode pembayaran beragam</li>
            <li> Laporan penjualan harian, mingguan, dan bulanan</li>
            <li> Manajemen akun kasir oleh admin UMKM</li>
          </ul>

          <h2>Manfaat</h2>
          <p>
            Dengan menggunakan sistem ini, pelaku UMKM tidak perlu lagi mencatat secara manual
            transaksi atau stok produk. Semua tercatat otomatis dan dapat dievaluasi kapan pun
            melalui laporan yang tersedia.
          </p>

          <h2>Dukungan Multi-User</h2>
          <p>
            Sistem ini mendukung banyak UMKM sekaligus, dengan akses login yang aman dan data yang
            terpisah antar UMKM, sehingga setiap pemilik usaha memiliki kendali penuh atas usahanya
            masing-masing.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
