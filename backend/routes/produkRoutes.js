const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); 

router.get('/', verifyToken, produkController.getAllProduk);
router.post('/', verifyToken, upload.single('gambar'), produkController.createProduk); 
router.put('/:id', verifyToken, upload.single('gambar'), produkController.updateProduk); 
router.delete('/:id', verifyToken, produkController.deleteProduk);

module.exports = router;
