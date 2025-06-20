import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar.js';
import '../css/DashboardAdmin.css';

const DashboardAdmin = () => {
  const [produkList, setProdukList] = useState([]);
  const [form, setForm] = useState({
    nama_produk: '',
    kategori: '',
    harga: '',
    stok: ''
  });
  const [gambar, setGambar] = useState(null); 
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('userRole');

  const fetchProduk = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/produk', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdukList(res.data);
    } catch (err) {
      console.error('Gagal ambil data produk:', err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setGambar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nama_produk', form.nama_produk);
      formData.append('kategori', form.kategori);
      formData.append('harga', form.harga);
      formData.append('stok', form.stok);
      if (gambar) {
        formData.append('gambar', gambar);
      }

      if (isEditing) {
        await axios.put(`http://localhost:5000/api/produk/${editId}`, formData, {
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
        });
      } else {
        if (role === 'admin') {
          await axios.post('http://localhost:5000/api/produk', formData, {
            headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
          });
        } else {
          alert("Kasir tidak diizinkan menambah produk.");
          return;
        }
      }

      setForm({ nama_produk: '', kategori: '', harga: '', stok: '' });
      setGambar(null);
      setIsEditing(false);
      fetchProduk();
    } catch (err) {
      console.error('Gagal simpan data:', err);
    }
  };

  const handleEdit = (item) => {
    setForm({
      nama_produk: item.nama_produk,
      kategori: item.kategori,
      harga: item.harga,
      stok: item.stok
    });
    setIsEditing(true);
    setEditId(item.id_produk);
  };

  const handleDelete = async (id) => {
    if (role !== 'admin') {
      alert("Kasir tidak bisa menghapus produk.");
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/produk/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProduk();
    } catch (err) {
      console.error('Gagal hapus data:', err);
    }
  };

  useEffect(() => {
    fetchProduk();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h2>{role === 'admin' ? 'Kelola Produk' : 'Edit Stok Produk'}</h2>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
            <div className="form-grid">
              <input type="text" name="nama_produk" placeholder="Nama Produk" value={form.nama_produk} onChange={handleChange} required disabled={role === 'kasir'} className="form-input" />
              <input type="text" name="kategori" placeholder="Kategori" value={form.kategori} onChange={handleChange} required disabled={role === 'kasir'} className="form-input" />
              <input type="number" name="harga" placeholder="Harga" value={form.harga} onChange={handleChange} required disabled={role === 'kasir'} className="form-input" />
              <input type="number" name="stok" placeholder="Stok" value={form.stok} onChange={handleChange} required className="form-input" />
              <input type="file" name="gambar" onChange={handleFileChange} className="form-input" accept="image/*" />
            </div>
            <button type="submit" className="submit-btn">
              {isEditing ? 'Update' : (role === 'admin' ? 'Tambah Produk' : 'Update Stok')}
            </button>
          </form>
        </div>

        <div className="table-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Gambar</th>
                <th>Nama</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {produkList.map((item) => (
                <tr key={item.id_produk}>
                  <td>
                    {item.gambar && (
                      <img src={`http://localhost:5000/uploads/${item.gambar}`} alt={item.nama_produk} style={{ width: '80px' }} />
                    )}
                  </td>
                  <td>{item.nama_produk}</td>
                  <td>{item.kategori}</td>
                  <td>Rp {parseInt(item.harga).toLocaleString('id-ID')}</td>
                  <td>{item.stok}</td>
                  <td className="action-buttons">
                    <button onClick={() => handleEdit(item)} className="edit-btn">Edit</button>
                    {role === 'admin' && (
                      <button onClick={() => handleDelete(item.id_produk)} className="delete-btn">Hapus</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DashboardAdmin;
