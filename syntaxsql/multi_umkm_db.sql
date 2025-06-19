-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 19, 2025 at 01:30 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `multi_umkm_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tabel_detail_transaksi`
--

CREATE TABLE `tabel_detail_transaksi` (
  `id_detail` int(11) NOT NULL,
  `id_transaksi` int(11) DEFAULT NULL,
  `id_produk` int(11) DEFAULT NULL,
  `jumlah` int(11) DEFAULT NULL,
  `subtotal` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabel_detail_transaksi`
--

INSERT INTO `tabel_detail_transaksi` (`id_detail`, `id_transaksi`, `id_produk`, `jumlah`, `subtotal`) VALUES
(1, 1, 1, 1, 150000),
(2, 2, 1, 2, 300000),
(3, 3, 1, 2, 300000),
(4, 3, 3, 1, 65000),
(5, 4, 2, 1, 75000),
(6, 4, 4, 2, 160000),
(7, 5, 2, 1, 75000),
(8, 5, 4, 1, 80000),
(9, 6, 4, 1, 80000),
(10, 6, 2, 3, 225000),
(11, 7, 2, 1, 75000),
(12, 8, 4, 1, 80000);

-- --------------------------------------------------------

--
-- Table structure for table `tabel_produk`
--

CREATE TABLE `tabel_produk` (
  `id_produk` int(11) NOT NULL,
  `id_umkm` int(11) DEFAULT NULL,
  `nama_produk` varchar(100) DEFAULT NULL,
  `kategori` varchar(50) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  `harga` int(11) DEFAULT NULL,
  `stok` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabel_produk`
--

INSERT INTO `tabel_produk` (`id_produk`, `id_umkm`, `nama_produk`, `kategori`, `gambar`, `harga`, `stok`, `created_at`) VALUES
(1, 1, 'Mykonos California', 'Parfum', '1749626218357-967243714.jpg', 150000, 26, '2025-06-11 12:57:38'),
(2, 2, 'True Tobaco', 'Liquid', '1749633008763-656917193.jpg', 75000, 39, '2025-06-11 16:10:08'),
(3, 1, 'Melon', 'liquid ', '1749637173494-784976070.jpg', 65000, 38, '2025-06-11 17:19:33'),
(4, 2, 'Cuban Creme', 'Liquid', '1749985477487-697758486.jpg', 80000, 45, '2025-06-15 18:04:37');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_transaksi`
--

CREATE TABLE `tabel_transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_umkm` int(11) DEFAULT NULL,
  `id_kasir` int(11) DEFAULT NULL,
  `tanggal_transaksi` datetime DEFAULT current_timestamp(),
  `total_bayar` int(11) DEFAULT NULL,
  `metode_pembayaran` enum('cash','qris','transfer') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabel_transaksi`
--

INSERT INTO `tabel_transaksi` (`id_transaksi`, `id_umkm`, `id_kasir`, `tanggal_transaksi`, `total_bayar`, `metode_pembayaran`) VALUES
(1, 1, 2, '2025-06-11 13:49:47', 150000, 'cash'),
(2, 1, 2, '2025-06-11 14:47:04', 300000, 'cash'),
(3, 1, 2, '2025-06-11 17:20:26', 365000, 'cash'),
(4, 2, 6, '2025-06-15 18:05:47', 235000, 'cash'),
(5, 2, 6, '2025-06-16 12:40:05', 155000, 'cash'),
(6, 2, 6, '2025-06-16 12:40:17', 305000, 'cash'),
(7, 2, 6, '2025-06-16 12:55:15', 75000, 'transfer'),
(8, 2, 6, '2025-06-16 12:55:33', 80000, 'qris');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_umkm`
--

CREATE TABLE `tabel_umkm` (
  `id_umkm` int(11) NOT NULL,
  `nama_umkm` varchar(100) DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `telepon` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabel_umkm`
--

INSERT INTO `tabel_umkm` (`id_umkm`, `nama_umkm`, `alamat`, `telepon`, `created_at`) VALUES
(1, 'Parfum Condet', 'Jl.condet raya No 12', '0855164455', '2025-06-11 12:19:04'),
(2, 'Liquid Store', 'Grand wisata Bekasi Timur', '0856747525', '2025-06-11 16:09:10'),
(3, 'Baju Condet', 'jalan condet', '0856554894', '2025-06-11 17:17:40');

-- --------------------------------------------------------

--
-- Table structure for table `tabel_user`
--

CREATE TABLE `tabel_user` (
  `id_user` int(11) NOT NULL,
  `id_umkm` int(11) DEFAULT NULL,
  `nama_lengkap` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('admin','kasir') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tabel_user`
--

INSERT INTO `tabel_user` (`id_user`, `id_umkm`, `nama_lengkap`, `email`, `password`, `role`, `created_at`) VALUES
(1, 1, 'Bayu', 'bayu13gmail.com', '$2b$10$hxIO/alm8vdW/sUvtAamkuTZB4ZaoPsqXNbnrFvIOdlAWZ2jwHhiW', 'admin', '2025-06-11 12:19:04'),
(2, 1, 'asfha', 'asfha12@gmail.com', '$2b$10$LCbE8QSRbEFzcoCmDNOU.O0zJaiDM19knUUn.7wt5CQi3bZbPMBGa', 'kasir', '2025-06-11 12:32:04'),
(3, 2, 'eggy', 'eggy@gmail.com', '$2b$10$ob0rA2FwD.niAouofB9F4uJ23G6mSvPvFzPStxR2s.IRjJ9ZsHgc.', 'admin', '2025-06-11 16:09:10'),
(4, 3, 'khairul', 'khairul11@gmail.com', '$2b$10$WGDkVP30v4Lr9r3RXXmEVOgN3MDR5WV04fHR1oYtQWpygXGN/hvcm', 'admin', '2025-06-11 17:17:40'),
(5, 3, 'daffa', 'daffa11@gmail.com', '$2b$10$qxww2JS1K6FMRtP1giRAFuVTpezDeVCZILIbA1Zh5px9ur0sIH9y.', 'kasir', '2025-06-11 17:18:29'),
(6, 2, 'syahrul', 'syahrul26@gmail.com', '$2b$10$pGthUE2uFILmFh8p0dBrdeohmEwHTF0kU3YcRl5C6Pqn.0TkL16qK', 'kasir', '2025-06-15 18:03:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tabel_detail_transaksi`
--
ALTER TABLE `tabel_detail_transaksi`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_transaksi` (`id_transaksi`),
  ADD KEY `id_produk` (`id_produk`);

--
-- Indexes for table `tabel_produk`
--
ALTER TABLE `tabel_produk`
  ADD PRIMARY KEY (`id_produk`),
  ADD KEY `id_umkm` (`id_umkm`);

--
-- Indexes for table `tabel_transaksi`
--
ALTER TABLE `tabel_transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_umkm` (`id_umkm`),
  ADD KEY `id_kasir` (`id_kasir`);

--
-- Indexes for table `tabel_umkm`
--
ALTER TABLE `tabel_umkm`
  ADD PRIMARY KEY (`id_umkm`);

--
-- Indexes for table `tabel_user`
--
ALTER TABLE `tabel_user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `id_umkm` (`id_umkm`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tabel_detail_transaksi`
--
ALTER TABLE `tabel_detail_transaksi`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tabel_produk`
--
ALTER TABLE `tabel_produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tabel_transaksi`
--
ALTER TABLE `tabel_transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tabel_umkm`
--
ALTER TABLE `tabel_umkm`
  MODIFY `id_umkm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tabel_user`
--
ALTER TABLE `tabel_user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tabel_detail_transaksi`
--
ALTER TABLE `tabel_detail_transaksi`
  ADD CONSTRAINT `tabel_detail_transaksi_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `tabel_transaksi` (`id_transaksi`),
  ADD CONSTRAINT `tabel_detail_transaksi_ibfk_2` FOREIGN KEY (`id_produk`) REFERENCES `tabel_produk` (`id_produk`);

--
-- Constraints for table `tabel_produk`
--
ALTER TABLE `tabel_produk`
  ADD CONSTRAINT `tabel_produk_ibfk_1` FOREIGN KEY (`id_umkm`) REFERENCES `tabel_umkm` (`id_umkm`);

--
-- Constraints for table `tabel_transaksi`
--
ALTER TABLE `tabel_transaksi`
  ADD CONSTRAINT `tabel_transaksi_ibfk_1` FOREIGN KEY (`id_umkm`) REFERENCES `tabel_umkm` (`id_umkm`),
  ADD CONSTRAINT `tabel_transaksi_ibfk_2` FOREIGN KEY (`id_kasir`) REFERENCES `tabel_user` (`id_user`);

--
-- Constraints for table `tabel_user`
--
ALTER TABLE `tabel_user`
  ADD CONSTRAINT `tabel_user_ibfk_1` FOREIGN KEY (`id_umkm`) REFERENCES `tabel_umkm` (`id_umkm`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
