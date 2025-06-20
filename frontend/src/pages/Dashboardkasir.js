import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/DashboardKasir.css';

const DashboardKasir = () => {
  const [produkList, setProdukList] = useState([]);
  const [keranjang, setKeranjang] = useState([]);
  const [metodePembayaran, setMetodePembayaran] = useState('cash');
  const [showPopup, setShowPopup] = useState(false); // ✅ State notifikasi popup

  const token = localStorage.getItem('token');

  const fetchProduk = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/produk', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProdukList(res.data);
    } catch (err) {
      console.error('Gagal ambil produk:', err);
    }
  };

  const tambahKeKeranjang = (produk) => {
    const existing = keranjang.find((item) => item.id_produk === produk.id_produk);
    if (existing) {
      const updated = keranjang.map((item) =>
        item.id_produk === produk.id_produk
          ? { ...item, jumlah: item.jumlah + 1, subtotal: (item.jumlah + 1) * item.harga }
          : item
      );
      setKeranjang(updated);
    } else {
      setKeranjang([
        ...keranjang,
        { ...produk, jumlah: 1, subtotal: produk.harga }
      ]);
    }
  };

  const tambahJumlah = (id_produk) => {
    const updated = keranjang.map((item) =>
      item.id_produk === id_produk
        ? { ...item, jumlah: item.jumlah + 1, subtotal: (item.jumlah + 1) * item.harga }
        : item
    );
    setKeranjang(updated);
  };

  const kurangiJumlah = (id_produk) => {
    const updated = keranjang
      .map((item) =>
        item.id_produk === id_produk
          ? { ...item, jumlah: item.jumlah - 1, subtotal: (item.jumlah - 1) * item.harga }
          : item
      )
      .filter((item) => item.jumlah > 0);
    setKeranjang(updated);
  };

  const kirimTransaksi = async () => {
    if (keranjang.length === 0) return;
    try {
      await axios.post(
        'http://localhost:5000/api/transaksi',
        {
          metode_pembayaran: metodePembayaran,
          items: keranjang
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setKeranjang([]);
      setShowPopup(true); // ✅ Tampilkan popup sukses
      setTimeout(() => setShowPopup(false), 3000); // ✅ Hilangkan popup otomatis
    } catch (err) {
      console.error('Gagal simpan transaksi:', err);
    }
  };

  const totalHarga = keranjang.reduce((total, item) => total + item.subtotal, 0);

  useEffect(() => {
    fetchProduk();
  }, []);

  return (
    <>
      <Navbar />
      <div className="dashboard-kasir-container">
        {showPopup && (
          <div className="popup-success">
            ✅ Transaksi berhasil disimpan!
          </div>
        )}

        <div className="dashboard-kasir-wrapper">
          <h2 className="dashboard-kasir-title">Dashboard Kasir</h2>

          <div className="dashboard-kasir-section">
            <h4 className="dashboard-kasir-section-title">Pilih Produk</h4>
            <div className="dashboard-kasir-produk-grid">
              {produkList.map((item) => (
                <div key={item.id_produk} className="dashboard-kasir-produk-item">
                  {item.gambar && (
                    <img
                      src={`http://localhost:5000/uploads/${item.gambar}`}
                      alt={item.nama_produk}
                      style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '10px' }}
                    />
                  )}
                  <div className="dashboard-kasir-produk-info">
                    <div className="dashboard-kasir-produk-nama">{item.nama_produk}</div>
                    <div className="dashboard-kasir-produk-harga">Rp {item.harga.toLocaleString('id-ID')}</div>
                  </div>
                  <button
                    className="dashboard-kasir-add-button"
                    onClick={() => tambahKeKeranjang(item)}
                  >
                    Tambah
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-kasir-section">
            <h4 className="dashboard-kasir-section-title">Keranjang</h4>
            <div className="dashboard-kasir-keranjang">
              {keranjang.length === 0 ? (
                <div className="dashboard-kasir-keranjang-empty">
                  Keranjang masih kosong
                </div>
              ) : (
                <>
                  <ul className="dashboard-kasir-keranjang-list">
                    {keranjang.map((item) => (
                      <li key={item.id_produk} className="dashboard-kasir-keranjang-item">
                        <div className="dashboard-kasir-item-info">
                          <span>{item.nama_produk}</span>
                          <div className="dashboard-kasir-jumlah">
                            <button onClick={() => kurangiJumlah(item.id_produk)}>-</button>
                            <span>x {item.jumlah}</span>
                            <button onClick={() => tambahJumlah(item.id_produk)}>+</button>
                          </div>
                        </div>
                        <span className="dashboard-kasir-subtotal">
                          Rp {item.subtotal.toLocaleString('id-ID')}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="dashboard-kasir-total">
                    Total: Rp {totalHarga.toLocaleString('id-ID')}
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="dashboard-kasir-section">
            <div className="dashboard-kasir-payment-section">
              <h4 className="dashboard-kasir-section-title">Pilih Metode Pembayaran</h4>
              <select
                className="dashboard-kasir-select"
                value={metodePembayaran}
                onChange={(e) => setMetodePembayaran(e.target.value)}
              >
                <option value="cash">Cash</option>
                <option value="qris">QRIS</option>
                <option value="transfer">Transfer</option>
              </select>
            </div>
          </div>

          <button
            className="dashboard-kasir-submit-button"
            onClick={kirimTransaksi}
            disabled={keranjang.length === 0}
          >
            {keranjang.length === 0 ? 'Keranjang Kosong' : 'Simpan Transaksi'}
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardKasir;
