-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: נובמבר 16, 2021 בזמן 07:42 PM
-- גרסת שרת: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shopping-online`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `carts`
--

CREATE TABLE `carts` (
  `cart_ID` int(11) NOT NULL,
  `castumer_ID` int(11) NOT NULL,
  `date` date NOT NULL,
  `open` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `carts`
--

INSERT INTO `carts` (`cart_ID`, `castumer_ID`, `date`, `open`) VALUES
(26, 208816082, '2021-10-29', 0),
(29, 208816082, '2021-11-02', 0),
(30, 315555201, '2021-11-10', 0),
(31, 208816082, '2021-11-02', 0),
(32, 208816082, '2021-11-02', 0),
(33, 208816082, '2021-11-14', 1),
(34, 123, '2021-11-09', 1),
(35, 12, '2021-11-09', 0),
(36, 12, '2021-11-09', 0),
(37, 12, '2021-11-10', 1),
(38, 12, '2021-11-09', 0),
(39, 12, '2021-11-10', 1),
(40, 12, '2021-11-10', 1),
(41, 1212, '2021-11-10', 1),
(42, 1232, '2021-11-10', 1),
(43, 1233, '2021-11-10', 1),
(44, 12221, '2021-11-10', 1),
(45, 315555201, '2021-11-10', 0),
(46, 315555201, '2021-11-10', 0),
(47, 315555201, '2021-11-10', 0),
(48, 315555201, '2021-11-10', 1);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `castumers`
--

CREATE TABLE `castumers` (
  `castumer_ID` int(20) NOT NULL,
  `first_Name` varchar(50) NOT NULL,
  `last_Name` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(80) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `open` int(11) NOT NULL,
  `admin` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `castumers`
--

INSERT INTO `castumers` (`castumer_ID`, `first_Name`, `last_Name`, `username`, `password`, `city`, `street`, `open`, `admin`) VALUES
(0, '', '', 'ron', '123123', '', '', 1, 1),
(208816082, 'שלומי', 'דויטש', 'shlomi', '123123', 'Afule', 'שאולזון', 1, 0),
(315555201, 'אסתי', 'דויטש', 'esty', '123123', 'Tel aviv', 'החילזון', 1, 0);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `categories`
--

CREATE TABLE `categories` (
  `category_ID` int(11) NOT NULL,
  `category_Name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `categories`
--

INSERT INTO `categories` (`category_ID`, `category_Name`) VALUES
(1, 'Fruits'),
(2, 'Fish'),
(3, 'Snacks'),
(4, 'Ice-Creame'),
(5, 'Dairy'),
(6, 'Meet');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `orders`
--

CREATE TABLE `orders` (
  `ID` int(11) NOT NULL,
  `castumer_ID` int(11) NOT NULL,
  `cart_ID` int(11) NOT NULL,
  `total_Price` int(11) NOT NULL,
  `city` varchar(50) NOT NULL,
  `street` varchar(100) NOT NULL,
  `delivery_Date` date NOT NULL,
  `order_Date` date NOT NULL,
  `credit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `orders`
--

INSERT INTO `orders` (`ID`, `castumer_ID`, `cart_ID`, `total_Price`, `city`, `street`, `delivery_Date`, `order_Date`, `credit`) VALUES
(2, 208816082, 26, 359, 'Afule', 'שאולזון', '2021-09-29', '2021-10-29', 4565),
(3, 208816082, 26, 359, 'Afule', 'שאולזון', '2021-09-29', '2021-10-29', 4565),
(4, 208816082, 26, 359, 'Afule', 'שאולזון', '2021-09-29', '2021-10-29', 4565),
(5, 208816082, 26, 359, 'Afule', 'שאולזון', '2021-09-29', '2021-10-29', 4565),
(6, 208816082, 26, 359, 'Afule', 'שאולזון', '2021-09-09', '2021-10-29', 456),
(7, 208816082, 29, 679, 'undefined', '12321', '0000-00-00', '2021-11-02', 12321),
(8, 208816082, 31, 15, 'Afule', '1231231', '0000-00-00', '2021-11-02', 1231231),
(9, 208816082, 31, 15, 'Afule', '32131', '0000-00-00', '2021-11-02', 32131),
(10, 208816082, 31, 15, 'Afule', '2021-11-18', '2021-11-18', '2021-11-02', 1992),
(11, 208816082, 31, 15, 'Afule', '2021-11-09', '2021-11-09', '2021-11-02', 2001),
(12, 208816082, 31, 15, 'Afule', 'שאולזון', '2021-11-10', '2021-11-02', 1231),
(13, 208816082, 32, 761, 'Afule', 'שאולזון', '2021-11-09', '2021-11-02', 4565),
(14, 12, 35, 10, 'jerusalem', 'שאולזון', '2021-11-17', '2021-11-09', 12),
(15, 12, 38, 15, 'jerusalem', 'שאולזון', '2021-11-04', '2021-11-09', 1212),
(16, 12, 36, 25, 'jerusalem', '12', '0012-12-12', '2021-11-09', 12),
(17, 315555201, 30, 3270, 'jerusalem', '7 ירמיהו', '2021-11-24', '2021-11-10', 1232),
(18, 315555201, 45, 22825, 'Tel aviv', 'החילזון', '2021-09-27', '2021-11-10', 4565),
(19, 315555201, 46, 25, 'Tel aviv', 'החילזון', '2021-11-09', '2021-11-10', 45),
(20, 315555201, 47, 25, 'Tel aviv', 'החילזון', '2021-11-23', '2021-11-10', 4565);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `products`
--

CREATE TABLE `products` (
  `product_ID` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `category_ID` int(11) NOT NULL,
  `price` int(50) NOT NULL,
  `image` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `products`
--

INSERT INTO `products` (`product_ID`, `name`, `category_ID`, `price`, `image`) VALUES
(16, 'Musht', 2, 26, 'dc3b0000-b829-43f1-806c-99f97a4047bb.jpg'),
(17, 'Salmon', 2, 72, '17.jpg'),
(18, 'Milk', 5, 5, '18.jpg'),
(19, 'Steak', 6, 80, '19.jpg'),
(20, 'Karamel', 4, 15, 'fc5b1854-6a4e-47fd-a9da-4d1ecd8a5bc5.jpg'),
(21, 'Bamba', 3, 8, '21.jpg'),
(22, 'Bisly', 3, 6, '22.jpg'),
(23, 'Banana!', 1, 5, '23.jpg'),
(24, 'blabla', 3, 20, '24.jpg');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `products_cart`
--

CREATE TABLE `products_cart` (
  `ID` int(11) NOT NULL,
  `product_ID` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `total_Price` int(11) NOT NULL,
  `cart_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `products_cart`
--

INSERT INTO `products_cart` (`ID`, `product_ID`, `count`, `total_Price`, `cart_ID`) VALUES
(72, 19, 1, 80, 26),
(74, 17, 2, 150, 26),
(75, 18, 5, 25, 26),
(76, 16, 4, 104, 26),
(106, 16, 4, 104, 29),
(107, 17, 4, 300, 29),
(125, 20, 2, 30, 29),
(126, 19, 3, 240, 29),
(127, 16, 1, 26, 0),
(128, 17, 2, 144, 0),
(130, 23, 1, 5, 29),
(132, 23, 3, 15, 31),
(138, 17, 3, 216, 32),
(139, 20, 4, 60, 32),
(140, 18, 1, 5, 32),
(141, 19, 6, 480, 32),
(146, 23, 2, 10, 34),
(148, 23, 2, 10, 35),
(149, 23, 3, 15, 38),
(150, 23, 5, 25, 36),
(154, 23, 2, 10, 40),
(155, 16, 2, 52, 40),
(156, 20, 2, 30, 40),
(213, 23, 3, 15, 41),
(214, 23, 1, 5, 37),
(219, 23, 12, 60, 44),
(220, 23, 654, 3270, 30),
(221, 23, 4565, 22825, 45),
(222, 23, 5, 25, 46),
(223, 23, 5, 25, 47),
(224, 22, 456, 2736, 48),
(225, 21, 456, 3648, 48),
(226, 24, 222, 4440, 48),
(232, 18, 10, 50, 33),
(246, 21, 4, 32, 33),
(247, 23, 3, 15, 33),
(248, 20, 3, 45, 33);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`cart_ID`),
  ADD KEY `castumer_ID` (`castumer_ID`);

--
-- אינדקסים לטבלה `castumers`
--
ALTER TABLE `castumers`
  ADD PRIMARY KEY (`castumer_ID`);

--
-- אינדקסים לטבלה `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_ID`);

--
-- אינדקסים לטבלה `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `cart_ID` (`cart_ID`),
  ADD KEY `castumer_ID` (`castumer_ID`);

--
-- אינדקסים לטבלה `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_ID`),
  ADD KEY `category_ID` (`category_ID`);

--
-- אינדקסים לטבלה `products_cart`
--
ALTER TABLE `products_cart`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `product_ID` (`product_ID`),
  ADD KEY `cart_ID` (`cart_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `cart_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `products_cart`
--
ALTER TABLE `products_cart`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=249;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cart_ID`) REFERENCES `carts` (`cart_ID`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`castumer_ID`) REFERENCES `castumers` (`castumer_ID`);

--
-- הגבלות לטבלה `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_ID`) REFERENCES `categories` (`category_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
