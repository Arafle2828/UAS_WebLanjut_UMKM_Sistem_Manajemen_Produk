const db = require('../config/db');
const bcrypt = require('bcryptjs');

// ✅ Tambah kasir (hanya admin yang bisa)
exports.tambahKasir = (req, res) => {
  const { nama_lengkap, email, password } = req.body;
  const id_umkm = req.user.id_umkm;

  if (!nama_lengkap || !email || !password) {
    return res.status(400).json({ message: 'Semua field wajib diisi' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const sql = `
    INSERT INTO tabel_user (id_umkm, nama_lengkap, email, password, role, created_at)
    VALUES (?, ?, ?, ?, 'kasir', NOW())`;

  db.query(sql, [id_umkm, nama_lengkap, email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal menambahkan kasir' });
    res.status(201).json({ message: 'Kasir berhasil ditambahkan' });
  });
};

// ✅ Update email & password user login (admin/kasir)
exports.updateUserAuth = (req, res) => {
  const { id } = req.params;
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password wajib diisi' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

const query = `
  UPDATE tabel_user
  SET email = ?, password = ?
  WHERE id_user = ?`;


  db.query(query, [email, hashedPassword, id], (err) => {
    if (err) return res.status(500).json({ message: 'Gagal update akun login' });
    res.json({ message: 'Data akun berhasil diperbarui' });
  });
};
