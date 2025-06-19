const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN UMKM
exports.register = (req, res) => {
  const { nama_umkm, alamat, telepon, nama_lengkap, email, password } =
    req.body;

  if (!nama_umkm || !email || !password) {
    return res.status(400).json({ message: "Data tidak lengkap" });
  }

  const insertUMKM = `INSERT INTO tabel_umkm (nama_umkm, alamat, telepon, created_at) VALUES (?, ?, ?, NOW())`;
  db.query(insertUMKM, [nama_umkm, alamat, telepon], (err, result) => {
    if (err) return res.status(500).json({ message: "Gagal menyimpan UMKM" });

    const id_umkm = result.insertId;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const insertUser = `
      INSERT INTO tabel_user (id_umkm, nama_lengkap, email, password, role, created_at)
      VALUES (?, ?, ?, ?, 'admin', NOW())`;
    db.query(
      insertUser,
      [id_umkm, nama_lengkap, email, hashedPassword],
      (err2) => {
        if (err2)
          return res.status(500).json({ message: "Gagal menyimpan user" });
        res.status(201).json({ message: "Registrasi berhasil" });
      }
    );
  });
};

// LOGIN UNTUK ADMIN DAN KASIR (DENGAN OPSIONAL id_umkm UNTUK KASIR)
exports.login = (req, res) => {
  const { email, password, id_umkm } = req.body;

  const query = `SELECT * FROM tabel_user WHERE email = ?`;
  db.query(query, [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ message: "Email tidak ditemukan" });
    }

    const user = result[0];

    // Validasi password
    const isPasswordMatch = bcrypt.compareSync(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Password salah" });
    }

    // Jika role adalah kasir, cek id_umkm yang dimasukkan harus sesuai
    if (user.role === "kasir" && parseInt(user.id_umkm) !== parseInt(id_umkm)) {
      return res.status(403).json({ message: "ID UMKM tidak sesuai" });
    }

    const token = jwt.sign(
      { id_user: user.id_user, role: user.role, id_umkm: user.id_umkm },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id_user: user.id_user,
        nama: user.nama_lengkap,
        role: user.role,
        id_umkm: user.id_umkm,
      },
    });
  });
};
