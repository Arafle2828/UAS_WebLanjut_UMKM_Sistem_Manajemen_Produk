const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ Tambah kasir (hanya admin)
router.post('/tambah-kasir', verifyToken, userController.tambahKasir);

// ✅ Update email dan password user (admin/kasir)
router.put('/:id', verifyToken, userController.updateUserAuth);

module.exports = router;
