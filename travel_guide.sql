-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 27, 2020 at 06:56 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `travel_guide`
--

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `commentid` int(20) NOT NULL,
  `threadid` int(20) NOT NULL,
  `message` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `reqid` int(20) NOT NULL,
  `id` int(20) NOT NULL,
  `threadid` int(20) NOT NULL,
  `reqtype` varchar(30) NOT NULL,
  `approved` tinyint(1) NOT NULL,
  `checked` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`reqid`, `id`, `threadid`, `reqtype`, `approved`, `checked`) VALUES
(1, 2, 1, 'create', 1, 1),
(2, 2, 2, 'create', 0, 0),
(3, 2, 1, 'update', 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `thread`
--

CREATE TABLE `thread` (
  `threadid` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `genre` varchar(100) NOT NULL,
  `country` varchar(50) NOT NULL,
  `cost` int(20) NOT NULL,
  `details` varchar(5000) NOT NULL,
  `publish` tinyint(1) NOT NULL,
  `createdby` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `thread`
--

INSERT INTO `thread` (`threadid`, `name`, `genre`, `country`, `cost`, `details`, `publish`, `createdby`) VALUES
(1, 'Sundarbans Mangrove Forest', 'Wildlife tourism', 'Bangladesh', 82, 'The Sundarbans are located at the point where the mighty waterways of the Brahmaputra and the scared Ganges crash into each other at the edge of the Bay of Bengal. As you would expect, the area is also covered in spectacular wildlife and is a UNESCO World Heritage Site. Here you will find Bengal tigers stalking the mangroves as well as rhesus macaques swinging in the canopies. Other highlights include chitals and you will also find local huts dotted around the area and hiding beneath waxy palm trees.', 1, 2),
(2, 'Cox’s Bazar', 'Beach tourism', 'Bangladesh', 120, 'Spilling out into the Bay of Bengal is Cox’s Bazar, an area covered in salty fishing skiffs and bustling jetties. This little town in the far south-east of Bangladesh is known for its stunning beach which stretches for an amazing 120 kilometers from north to south along the side of the balmy Indian Ocean. This is the third longest beach on the planet and you will find local fishermen reeling in the day’s catch as well as bubbling rock pools and crashing turquoise waves that make this a great spot for surfing.', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `type` varchar(20) NOT NULL,
  `contactno` varchar(20) NOT NULL,
  `country` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `type`, `contactno`, `country`) VALUES
(1, 'abc@gmail.com', 'admin', 'Soumik Datta', 'admin', '01515000111', 'Bangladesh'),
(2, 'abrar@gmail.com', '1234', 'Abrar Khan', 'scout', '01311-000022', 'Bangladesh'),
(3, 'arik@gmail.com', '1234', 'Fayaz Arik', 'general', '1717333444', 'Bangladesh'),
(5, 'test@yahoo.com', 'admin', 'admin2', 'admin', '01772000111', 'Bangladesh');

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlistid` int(20) NOT NULL,
  `id` int(20) NOT NULL,
  `threadid` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`commentid`),
  ADD KEY `threadid` (`threadid`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`reqid`),
  ADD KEY `id` (`id`),
  ADD KEY `threadid` (`threadid`);

--
-- Indexes for table `thread`
--
ALTER TABLE `thread`
  ADD PRIMARY KEY (`threadid`),
  ADD KEY `createdby` (`createdby`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlistid`),
  ADD KEY `id` (`id`),
  ADD KEY `threadid` (`threadid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comment`
--
ALTER TABLE `comment`
  MODIFY `commentid` int(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `reqid` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `thread`
--
ALTER TABLE `thread`
  MODIFY `threadid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlistid` int(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`threadid`) REFERENCES `thread` (`threadid`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`threadid`) REFERENCES `thread` (`threadid`);

--
-- Constraints for table `thread`
--
ALTER TABLE `thread`
  ADD CONSTRAINT `thread_ibfk_1` FOREIGN KEY (`createdby`) REFERENCES `user` (`id`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`threadid`) REFERENCES `thread` (`threadid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
