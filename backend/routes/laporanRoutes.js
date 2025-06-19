const express = require('express');
const router = express.Router();
const laporanController = require('../controllers/laporanController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, laporanController.laporanAdmin);

module.exports = router;
