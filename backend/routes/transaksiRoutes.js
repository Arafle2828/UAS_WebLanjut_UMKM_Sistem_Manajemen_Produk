const express = require('express');
const router = express.Router();
const transaksiController = require('../controllers/transaksiController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, transaksiController.buatTransaksi);

module.exports = router;
