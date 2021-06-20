-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 20 Jun 2021 pada 18.14
-- Versi server: 10.4.17-MariaDB
-- Versi PHP: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutech`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `productName` varchar(100) DEFAULT NULL,
  `buyPrice` int(11) DEFAULT NULL,
  `soldPrice` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `UpdatedAt` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `productName`, `buyPrice`, `soldPrice`, `stock`, `picture`, `createdAt`, `UpdatedAt`) VALUES
(15, 'Mobil', 1000, 2000, 50, 'product-picture-1624174317470.png', '2021-06-20 07:31:57', '2021-06-20 10:51:26'),
(16, 'Produk A', 1000, 2000, 50, 'product-picture-1624175385358.jpg', '2021-06-20 07:49:45', NULL),
(17, 'Produk V', 1000, 2000, 50, 'product-picture-1624175401000.jpg', '2021-06-20 07:50:01', NULL),
(18, 'Produk X', 1000, 2000, 50, 'product-picture-1624175635033.png', '2021-06-20 07:53:55', NULL),
(19, 'Produk Z', 1000, 2000, 50, 'product-picture-1624175652530.png', '2021-06-20 07:54:12', NULL),
(20, 'jam mahal', 9000, 19000, 1, 'product-picture-1624189487419.png', '2021-06-20 11:28:40', '2021-06-20 11:44:51'),
(21, 'yamaha', 19000, 25000, 12, 'product-picture-1624188622993.png', '2021-06-20 11:30:22', NULL),
(22, 'honda', 50000, 100000, 12, 'product-picture-1624188758818.png', '2021-06-20 11:32:38', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
