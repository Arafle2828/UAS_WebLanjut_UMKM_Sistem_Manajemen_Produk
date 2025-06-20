const db = require('../config/db');

exports.buatTransaksi = (req, res) => {
  const id_umkm = req.user.id_umkm;
  const id_kasir = req.user.id_user;
  const { metode_pembayaran, items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: 'Tidak ada item dalam transaksi' });
  }

  const total_bayar = items.reduce((acc, item) => acc + item.subtotal, 0);

  const insertTransaksi = `
    INSERT INTO tabel_transaksi (id_umkm, id_kasir, tanggal_transaksi, total_bayar, metode_pembayaran)
    VALUES (?, ?, NOW(), ?, ?)
  `;

  db.query(insertTransaksi, [id_umkm, id_kasir, total_bayar, metode_pembayaran], (err, result) => {
    if (err) return res.status(500).json({ message: 'Gagal simpan transaksi' });

    const id_transaksi = result.insertId;

    // Simpan detail transaksi
    const detailData = items.map((item) => [
      id_transaksi,
      item.id_produk,
      item.jumlah,
      item.subtotal
    ]);

    const insertDetail = `
      INSERT INTO tabel_detail_transaksi (id_transaksi, id_produk, jumlah, subtotal)
      VALUES ?
    `;

    db.query(insertDetail, [detailData], (err2) => {
      if (err2) return res.status(500).json({ message: 'Gagal simpan detail transaksi' });

      // ✅ Update stok produk
      const updatePromises = items.map((item) => {
        return new Promise((resolve, reject) => {
          const updateStok = `
            UPDATE tabel_produk 
            SET stok = stok - ? 
            WHERE id_produk = ? AND stok >= ?`;
          db.query(updateStok, [item.jumlah, item.id_produk, item.jumlah], (err3) => {
            if (err3) return reject(err3);
            resolve();
          });
        });
      });

      Promise.all(updatePromises)
        .then(() => {
          res.status(201).json({ message: 'Transaksi berhasil disimpan dan stok diperbarui' });
        })
        .catch((err4) => {
          res.status(500).json({
            message: 'Transaksi tersimpan, tapi gagal memperbarui stok produk',
            error: err4
          });
        });
    });
  });
};
