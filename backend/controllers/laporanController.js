const db = require("../config/db");

exports.laporanAdmin = (req, res) => {
  const id_umkm = req.user.id_umkm;
  const { dari, sampai } = req.query;

  // Ambil semua transaksi + total
  const transaksiQuery = `
    SELECT * FROM tabel_transaksi 
    WHERE id_umkm = ? 
    AND tanggal_transaksi BETWEEN ? AND ?
    ORDER BY tanggal_transaksi DESC`;

  db.query(transaksiQuery, [id_umkm, dari, sampai], (err, transaksiList) => {
    if (err) return res.status(500).json({ message: "Gagal ambil transaksi" });

    if (transaksiList.length === 0) {
      return res.json({ data: [], total: 0 });
    }

    const transaksiIds = transaksiList.map((trx) => trx.id_transaksi);

    // Ambil detail + nama produk
    const detailQuery = `
      SELECT d.id_transaksi, d.jumlah, p.nama_produk, p.gambar 
      FROM tabel_detail_transaksi d
      JOIN tabel_produk p ON d.id_produk = p.id_produk
      WHERE d.id_transaksi IN (?)

    `;

    db.query(detailQuery, [transaksiIds], (err2, detailList) => {
      if (err2)
        return res.status(500).json({ message: "Gagal ambil detail produk" });

      // Gabungkan transaksi dan detail produk
      const hasilGabungan = transaksiList.map((trx) => {
        return {
          ...trx,
          produk: detailList.filter(
            (item) => item.id_transaksi === trx.id_transaksi
          ),
        };
      });

      const total = transaksiList.reduce(
        (acc, item) => acc + item.total_bayar,
        0
      );  

      res.json({ data: hasilGabungan, total });
    });
  });
};
