-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2023 at 02:16 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pakshopnow`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `AdminID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Mobile` int(15) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Picture` text NOT NULL,
  `RegistrationDate` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`AdminID`, `FirstName`, `LastName`, `Email`, `Mobile`, `Password`, `Picture`, `RegistrationDate`) VALUES
(1, '', '', '', 0, '$2b$10$Euam.MqQLGvvuICkcpI.meJ330.2YmXY/vAy/ZYu8furNMtvbes4W', 'uploads\\admin\\profile_1704022267526.png', '2023-12-21 14:05:58');

-- --------------------------------------------------------

--
-- Table structure for table `bids`
--

CREATE TABLE `bids` (
  `bidId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `bidStartTime` varchar(255) NOT NULL,
  `bidEndTime` varchar(255) NOT NULL,
  `minBid` int(11) NOT NULL,
  `bidIncrement` int(11) NOT NULL,
  `currentBid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bids`
--

INSERT INTO `bids` (`bidId`, `productId`, `customerId`, `bidStartTime`, `bidEndTime`, `minBid`, `bidIncrement`, `currentBid`) VALUES
(1, 3, 0, '2023-12-30T01:51', '2023-12-31T01:51', 1200, 100, 0);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryId` int(11) NOT NULL,
  `categoryName` varchar(255) NOT NULL,
  `categoryDescription` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryId`, `categoryName`, `categoryDescription`, `createdAt`) VALUES
(6, 'Health', 'Health category\n', '2023-12-18 18:54:29'),
(7, 'Sports', 'Sports Category\n', '2023-12-18 18:59:27'),
(8, 'Fashion', 'Description for Fashion category', '2023-12-18 19:14:29'),
(10, 'Electronics', 'Electronics Category', '2023-12-19 00:06:06'),
(11, 'Kitchen', 'Kitchen Category', '2023-12-19 00:06:30'),
(12, 'Men', 'Men\'s Category', '2023-12-19 00:08:30'),
(13, 'Accessories ', 'Accessories Category', '2023-12-24 00:06:56'),
(15, 'Decoration', 'This is a decoration category', '2023-12-31 12:09:05');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `shippingaddress` text NOT NULL,
  `province` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postcode` varchar(20) NOT NULL,
  `country` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerId`, `name`, `email`, `mobile`, `password`, `shippingaddress`, `province`, `city`, `postcode`, `country`, `createdAt`, `updatedAt`) VALUES
(11, 'Talha Durani', 'talhakhaan164@gmail.com', '1234567', '$2b$10$Wfv1SE1nlDhfyCTZ9MI8vuiLJMwJ8tb.8XKyobHu3pOGsm9LLEALa', 'Zone 3 Regi Model Town', 'Khyber Pakhtunkhwa', 'Peshawar', '25000', 'Pakistan', '2023-12-23 23:18:42', '2023-12-23 23:18:42'),
(12, 'Muhammad Talha', 'tk97286@gmail.com', '03189485273', '$2b$10$/9VxdcyGOj31ULw11vINzOKUIZGFwAyxdDAhNacWwdIZLusn2FlNu', 'Regi Zone 3', 'Khyber Pakhtunkhwa', 'Peshawar', '25000', 'Pakistan', '2023-12-31 12:59:10', '2023-12-31 12:59:10');

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `mediaId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `fileType` varchar(10) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `filePath` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`mediaId`, `productId`, `fileType`, `fileName`, `filePath`, `createdAt`) VALUES
(1, 1, 'image/jpeg', '1703876766374_Apple Cutter.jpeg', 'uploads\\products\\1703876766374_Apple Cutter.jpeg', '2023-12-30 00:06:06'),
(2, 2, 'image/jpeg', '1703879024100_Electric Blender.jpeg', 'uploads\\products\\1703879024100_Electric Blender.jpeg', '2023-12-30 00:43:44'),
(3, 3, 'image/jpeg', '1703883153553_Coffee machine Green.jpeg', 'uploads\\products\\1703883153553_Coffee machine Green.jpeg', '2023-12-30 01:52:34'),
(4, 3, 'image/jpeg', '1703883153554_Coffee Machine White.jpeg', 'uploads\\products\\1703883153554_Coffee Machine White.jpeg', '2023-12-30 01:52:34');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productId` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  `deliveryDays` int(11) NOT NULL,
  `deliveryFee` decimal(10,0) NOT NULL,
  `basePrice` decimal(10,0) NOT NULL,
  `discPrice` decimal(10,0) NOT NULL,
  `inStock` tinyint(1) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `status` varchar(100) NOT NULL,
  `tags` text NOT NULL,
  `productType` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productId`, `title`, `description`, `quantity`, `weight`, `deliveryDays`, `deliveryFee`, `basePrice`, `discPrice`, `inStock`, `vendorId`, `categoryId`, `status`, `tags`, `productType`, `createdAt`) VALUES
(1, 'This is product title', '<p>Description</p>', 100, '150', 4, '100', '700', '500', 1, 1, 11, 'Active', 'cutter,apple,kitchen', 'normal', '2023-12-30 00:06:06'),
(2, 'M10 TWS I12 & i7s Airpods_ with Super Sound & High Quality Touch Sensors ', '<p><br></p>', 60, '320', 6, '131', '1189', '0', 0, 3, 10, 'Draft', 't,t2', 'normal', '2023-12-30 00:43:44'),
(3, 'Sample Bid Product', '<p>Sample Bid Product Description</p>', 20, '320', 5, '100', '0', '0', 1, 3, 10, 'Active', 'blender,juicer,tag2', 'bid', '2023-12-30 01:52:33');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `UserType` varchar(20) NOT NULL,
  `RegistrationDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `vendorId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `businessName` varchar(255) NOT NULL,
  `businessDetails` text NOT NULL,
  `categoryId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vendors`
--

INSERT INTO `vendors` (`vendorId`, `name`, `email`, `mobile`, `address`, `password`, `businessName`, `businessDetails`, `categoryId`, `createdAt`, `updatedAt`) VALUES
(1, 'Muhammad Talha', 'tk97286@gmail.com', '03189485273', 'Regi Model Town, Peshawar', '$2b$10$lwxIF5MdGgtn54eU1PKTLu6mF6XFvr4JB2CbJSWQtdgXcEIYOdr6.', 'PakShopNow', 'Online Sports Shop', 7, '2023-12-25 18:13:16', '2023-12-25 18:13:16'),
(3, 'Talha Durani', 'durani33@gmail.com', '233232321', 'Peshawar', '$2b$10$6wHqa5ONn6D3lXSrdPg1eelfOPmTM2pmBgMxxjFY4UCEvOp58j9hi', 'Daraz', 'Online Shop', 12, '2023-12-25 18:47:08', '2023-12-25 18:47:08'),
(4, 'Talha Khan', 'talha6@gmail.com', '42323233', 'Lahore', '$2b$10$RUmOAa1sfa4LDjg85OzgbengOTEprB1oX60SVdhPRlt5GZP0lQaxa', 'Fashion Shop', 'Online Fashion Shop', 8, '2023-12-25 18:50:31', '2023-12-25 18:50:31'),
(5, 'Seller', 'seller@gmail.com', '0321844343', 'Peshawar', '$2b$10$v7DSBU03m70kS5ZexSjn1el7Xa58OTIFj9B6oYR6yr/WHOQ6ct0x6', 'Decoration Shop', 'Best Decoration Shop', 15, '2023-12-31 12:44:23', '2023-12-31 12:44:23');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `bids`
--
ALTER TABLE `bids`
  ADD PRIMARY KEY (`bidId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `Unique` (`email`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`mediaId`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productId`),
  ADD KEY `categoryId` (`categoryId`),
  ADD KEY `vendorId` (`vendorId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`vendorId`),
  ADD UNIQUE KEY `Unique` (`email`),
  ADD KEY `categoryId` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `AdminID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bids`
--
ALTER TABLE `bids`
  MODIFY `bidId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `mediaId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `vendorId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`productId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`vendorId`) REFERENCES `vendors` (`vendorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_5` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`);

--
-- Constraints for table `vendors`
--
ALTER TABLE `vendors`
  ADD CONSTRAINT `vendors_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
