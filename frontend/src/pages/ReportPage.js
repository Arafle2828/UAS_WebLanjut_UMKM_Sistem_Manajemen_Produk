import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import '../css/ReportPage.css'; // Pastikan ada file ini

const ReportPage = () => {
  const [transaksi, setTransaksi] = useState([]);
  const [dari, setDari] = useState('');
  const [sampai, setSampai] = useState('');
  const [total, setTotal] = useState(0);
  const token = localStorage.getItem('token');

  const fetchLaporan = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/laporan?dari=${dari}&sampai=${sampai}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTransaksi(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Gagal ambil laporan:', err);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID').format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Navbar />
      <div className="report-container">
        <h2 className="report-title">Laporan Penjualan</h2>

        <div className="filter-section">
          <div className="filter-group">
            <label className="filter-label">Dari:</label>
            <input
              type="date"
              value={dari}
              onChange={(e) => setDari(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label className="filter-label">Sampai:</label>
            <input
              type="date"
              value={sampai}
              onChange={(e) => setSampai(e.target.value)}
              className="filter-input"
            />
          </div>

          <button onClick={fetchLaporan} className="filter-btn">
            Filter Laporan
          </button>
        </div>

        <div className="total-section">
          <h4 className="total-text">
            Total Penjualan: Rp {formatCurrency(total)}
          </h4>
        </div>

        <div className="report-table-container">
          {transaksi.length > 0 ? (
            <table className="report-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Metode Pembayaran</th>
                  <th>Total Bayar</th>
                </tr>
              </thead>
              <tbody>
                {transaksi.map((item) => (
                  <React.Fragment key={item.id_transaksi}>
                    <tr>
                      <td>{formatDate(item.tanggal_transaksi)}</td>
                      <td>{item.metode_pembayaran}</td>
                      <td>Rp {formatCurrency(item.total_bayar)}</td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <ul className="produk-list">
                          {(item.produk || []).map((p, index) => (
                            <li key={index} className="produk-item">
                              {p.gambar && (
                                <img
                                  src={`http://localhost:5000/uploads/${p.gambar}`}
                                  alt={p.nama_produk}
                                  className="produk-image"
                                />
                              )}
                              <div>
                                {p.nama_produk} - {p.jumlah} unit
                              </div>
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="empty-state">
              Belum ada data transaksi. Silakan pilih rentang tanggal dan klik Filter Laporan.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ReportPage;
