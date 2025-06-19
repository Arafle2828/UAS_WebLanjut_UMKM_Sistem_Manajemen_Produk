const db = require('../config/db');
const path = require('path');

// Ambil semua produk milik UMKM login
exports.getAllProduk = (req, res) => {
  const id_umkm = req.user.id_umkm;
  const query = 'SELECT * FROM tabel_produk WHERE id_umkm = ?';
  db.query(query, [id_umkm], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal ambil data produk' });
    res.json(result);
  });
};

// Tambah produk baru (dengan upload gambar)
exports.createProduk = (req, res) => {
  const { nama_produk, kategori, harga, stok } = req.body;
  const id_umkm = req.user.id_umkm;

  const gambar = req.file ? req.file.filename : null;

  const query = `
    INSERT INTO tabel_produk (id_umkm, nama_produk, kategori, harga, stok, gambar, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())`;

  db.query(query, [id_umkm, nama_produk, kategori, harga, stok, gambar], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal tambah produk' });
    res.status(201).json({ message: 'Produk ditambahkan' });
  });
};

// Update produk
exports.updateProduk = (req, res) => {
  const { id } = req.params;
  const { nama_produk, kategori, harga, stok } = req.body;
  const gambar = req.file ? req.file.filename : null;

  let query, params;

  if (gambar) {
    query = `
      UPDATE tabel_produk 
      SET nama_produk=?, kategori=?, harga=?, stok=?, gambar=? 
      WHERE id_produk=?`;
    params = [nama_produk, kategori, harga, stok, gambar, id];
  } else {
    query = `
      UPDATE tabel_produk 
      SET nama_produk=?, kategori=?, harga=?, stok=? 
      WHERE id_produk=?`;
    params = [nama_produk, kategori, harga, stok, id];
  }

  db.query(query, params, (err) => {
    if (err) return res.status(500).json({ message: 'Gagal update produk' });
    res.json({ message: 'Produk diperbarui' });
  });
};

// Hapus produk
exports.deleteProduk = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM tabel_produk WHERE id_produk=?';
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal hapus produk' });
    res.json({ message: 'Produk dihapus' });
  });
};
