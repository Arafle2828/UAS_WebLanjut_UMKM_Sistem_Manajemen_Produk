const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const produkRoutes = require('./routes/produkRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const laporanRoutes = require('./routes/laporanRoutes');
const userRoutes = require('./routes/userRoutes');
const umkmRoutes = require('./routes/umkmRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/produk', produkRoutes);
app.use('/api/transaksi', transaksiRoutes);
app.use('/api/laporan', laporanRoutes);
app.use('/api/user', userRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/umkm', umkmRoutes);

app.get('/', (req, res) => {
  res.send('Server UMKM berjalan...');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
