-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 13, 2016 at 09:38 AM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `tkframework`
--

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE IF NOT EXISTS `authors` (
`id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `encrypted_password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `introduction` text,
  `description` text,
  `refresh_token` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `email`, `encrypted_password`, `name`, `image`, `introduction`, `description`, `refresh_token`, `created_at`, `updated_at`) VALUES
(1, 'tubackkhoa@gmail.com', '$2a$10$0eHsl/PZMzl.eaVTnF6e2usJMg8OZ1BBJxGrC5yns/bHD6OMl2m2q', 'Pham Thanh Tu', '8a5a738b-e01c-4ba0-8c2f-ff510ca40600.png', '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}},"1":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"dcv0i","text":"Fruit blessed second give were. Created you''re. Creepeth one yielding seas over. And earth. Firmament whales. Bearing darkness seasons from creepeth may evening. Second saying fowl, of creeping set man good tree all i. Divide seed have. Created sixth bring. Second meat.Gathering one creepeth seas isn''t were void bearing us cattle. Divided whales so days. Female winged first bearing you''ll deep.Rule open darkness days us rule saw. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"},{"offset":92,"length":16,"style":"UNDERLINE"},{"offset":92,"length":16,"style":"ITALIC"}],"entityRanges":[{"offset":258,"length":12,"key":0}],"data":{}},{"key":"9sdri","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8d6hq","text":"Two greater female deep bring his be saw Days beginning which gathering from appear him Bearing very earth you''re, meat there tree tree Abundantly hath great let you, female moveth. Firmament.pp","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":88,"length":7,"key":1}],"data":{}}]}', '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"5v2be","text":"Herb sixth stars saying midst fifth he let bring green, isn''t won''t behold morning creepeth living Were man us set over signs whose morning. Fish stars so wherein bring which thing midst fruitful gathered land, land under you''ll.Seasons. Land place bring deep abundantly. Under, them earth, fifth. Form wherein one place behold Their, own beginning. Bearing multiply fish be!!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":238,"length":10,"style":"BOLD"},{"offset":350,"length":26,"style":"UNDERLINE"},{"offset":350,"length":26,"style":"ITALIC"}],"entityRanges":[{"offset":141,"length":10,"key":0}]}]}', '1.f386a17735748006734f1ee1b6b31c80e661b94f5ec878c475fd1a46b53689e9cfb91abc24b0cd3e', '2016-11-09 15:18:27', '2016-12-05 05:11:31');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE IF NOT EXISTS `items` (
`id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `sort_rank` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `target_type` enum('ItemText','ItemImage','ItemTwitter') NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `post_id`, `sort_rank`, `target_id`, `target_type`, `created_at`, `updated_at`) VALUES
(1, 1, 2, 1, 'ItemText', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(2, 1, 3, 1, 'ItemTwitter', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(3, 1, 4, 2, 'ItemText', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(4, 1, 5, 1, 'ItemImage', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(5, 1, 6, 2, 'ItemImage', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(6, 1, 7, 3, 'ItemImage', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(7, 2, 8, 3, 'ItemText', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(8, 2, 9, 4, 'ItemImage', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(9, 2, 10, 2, 'ItemTwitter', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(10, 2, 11, 4, 'ItemText', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(11, 2, 12, 3, 'ItemTwitter', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(12, 2, 13, 5, 'ItemImage', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(13, 2, 14, 5, 'ItemText', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(14, 2, 15, 6, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(15, 2, 16, 6, 'ItemText', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(16, 2, 17, 7, 'ItemText', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(17, 3, 18, 8, 'ItemText', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(18, 3, 19, 7, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(19, 3, 20, 4, 'ItemTwitter', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(20, 3, 21, 8, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(21, 4, 22, 9, 'ItemText', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(22, 4, 23, 5, 'ItemTwitter', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(23, 4, 24, 9, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(24, 4, 25, 10, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(25, 4, 26, 11, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(26, 4, 27, 12, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(27, 5, 28, 10, 'ItemText', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(28, 5, 29, 6, 'ItemTwitter', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(29, 5, 30, 13, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(30, 5, 31, 7, 'ItemTwitter', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(31, 5, 32, 8, 'ItemTwitter', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(32, 5, 33, 11, 'ItemText', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(33, 5, 34, 9, 'ItemTwitter', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(34, 5, 35, 14, 'ItemImage', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(35, 5, 36, 15, 'ItemImage', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(36, 5, 37, 12, 'ItemText', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(37, 6, 38, 13, 'ItemText', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(38, 6, 39, 10, 'ItemTwitter', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(39, 6, 40, 11, 'ItemTwitter', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(40, 6, 41, 14, 'ItemText', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(41, 6, 42, 16, 'ItemImage', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(42, 6, 43, 17, 'ItemImage', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(43, 6, 44, 12, 'ItemTwitter', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(55, 8, 56, 19, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(56, 8, 57, 20, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(57, 8, 58, 16, 'ItemTwitter', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(58, 9, 59, 21, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(59, 9, 60, 22, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(60, 9, 61, 22, 'ItemImage', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(61, 9, 62, 17, 'ItemTwitter', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(62, 10, 63, 23, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(63, 10, 64, 23, 'ItemImage', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(64, 10, 65, 18, 'ItemTwitter', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(65, 10, 66, 24, 'ItemImage', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(66, 10, 67, 24, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(67, 10, 68, 19, 'ItemTwitter', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(68, 10, 69, 25, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(69, 10, 70, 25, 'ItemImage', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(70, 10, 71, 26, 'ItemImage', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(71, 11, 72, 26, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(72, 11, 73, 20, 'ItemTwitter', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(73, 11, 74, 27, 'ItemImage', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(74, 12, 75, 27, 'ItemText', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(75, 12, 76, 28, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(76, 13, 77, 28, 'ItemText', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(77, 13, 78, 29, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(78, 13, 79, 21, 'ItemTwitter', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(79, 13, 80, 30, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(80, 13, 81, 31, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(81, 13, 82, 22, 'ItemTwitter', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(82, 13, 83, 23, 'ItemTwitter', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(83, 13, 84, 24, 'ItemTwitter', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(84, 13, 85, 25, 'ItemTwitter', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(85, 14, 86, 29, 'ItemText', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(86, 14, 87, 32, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(87, 14, 88, 33, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(88, 14, 89, 34, 'ItemImage', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(89, 14, 90, 30, 'ItemText', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(90, 14, 91, 35, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(91, 14, 92, 26, 'ItemTwitter', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(92, 14, 93, 27, 'ItemTwitter', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(93, 14, 94, 36, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(94, 14, 95, 37, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(95, 14, 96, 31, 'ItemText', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(96, 15, 97, 32, 'ItemText', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(97, 15, 98, 38, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(98, 15, 99, 28, 'ItemTwitter', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(99, 15, 100, 33, 'ItemText', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(100, 15, 101, 39, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(101, 16, 102, 34, 'ItemText', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(102, 16, 103, 40, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(103, 16, 104, 41, 'ItemImage', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(104, 17, 105, 35, 'ItemText', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(105, 17, 106, 36, 'ItemText', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(106, 17, 107, 42, 'ItemImage', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(107, 17, 108, 43, 'ItemImage', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(108, 17, 109, 37, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(109, 17, 110, 38, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(110, 17, 111, 39, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(111, 17, 112, 44, 'ItemImage', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(112, 17, 113, 40, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(113, 17, 114, 41, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(114, 18, 115, 42, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(115, 18, 116, 29, 'ItemTwitter', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(116, 18, 117, 43, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(117, 18, 118, 45, 'ItemImage', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(118, 18, 119, 30, 'ItemTwitter', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(119, 18, 120, 46, 'ItemImage', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(129, 20, 130, 46, 'ItemText', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(130, 20, 131, 50, 'ItemImage', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(131, 20, 132, 47, 'ItemText', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(132, 21, 133, 48, 'ItemText', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(133, 21, 134, 51, 'ItemImage', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(134, 21, 135, 52, 'ItemImage', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(135, 21, 136, 53, 'ItemImage', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(136, 21, 137, 35, 'ItemTwitter', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(137, 21, 138, 54, 'ItemImage', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(138, 21, 139, 55, 'ItemImage', '2016-11-09 15:18:40', '2016-11-09 15:18:40'),
(139, 21, 140, 56, 'ItemImage', '2016-11-09 15:18:40', '2016-11-09 15:18:40'),
(140, 21, 141, 36, 'ItemTwitter', '2016-11-09 15:18:40', '2016-11-09 15:18:40'),
(141, 21, 142, 49, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(142, 22, 143, 50, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(143, 22, 144, 37, 'ItemTwitter', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(144, 22, 145, 57, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(145, 22, 146, 38, 'ItemTwitter', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(146, 22, 147, 58, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(147, 22, 148, 39, 'ItemTwitter', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(148, 22, 149, 40, 'ItemTwitter', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(149, 23, 150, 51, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(150, 23, 151, 59, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(151, 24, 152, 52, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(152, 24, 153, 53, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(153, 25, 154, 54, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(154, 25, 155, 41, 'ItemTwitter', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(155, 25, 156, 60, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(156, 26, 157, 55, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(157, 26, 158, 56, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(158, 26, 159, 57, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(159, 26, 160, 58, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(160, 26, 161, 61, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(161, 26, 162, 62, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(162, 26, 163, 59, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(163, 26, 164, 63, 'ItemImage', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(164, 26, 165, 60, 'ItemText', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(165, 26, 166, 64, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(166, 26, 167, 61, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(167, 27, 168, 62, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(168, 27, 169, 63, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(169, 27, 170, 64, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(170, 27, 171, 65, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(171, 27, 172, 66, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(172, 27, 173, 65, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(173, 27, 174, 42, 'ItemTwitter', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(174, 27, 175, 43, 'ItemTwitter', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(175, 27, 176, 66, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(176, 28, 177, 67, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(177, 28, 178, 44, 'ItemTwitter', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(178, 28, 179, 68, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(179, 28, 180, 69, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(180, 29, 181, 70, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(181, 29, 182, 71, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(182, 29, 183, 72, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(183, 29, 184, 73, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(184, 30, 185, 74, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(185, 30, 186, 67, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(186, 30, 187, 75, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(187, 30, 188, 68, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(188, 30, 189, 45, 'ItemTwitter', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(189, 30, 190, 76, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(190, 30, 191, 46, 'ItemTwitter', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(191, 30, 192, 47, 'ItemTwitter', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(192, 30, 193, 77, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(193, 31, 194, 78, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(194, 31, 195, 69, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(195, 31, 196, 79, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(196, 31, 197, 80, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(197, 31, 198, 81, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(198, 31, 199, 70, 'ItemImage', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(199, 31, 200, 82, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(200, 31, 201, 83, 'ItemText', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(201, 31, 202, 71, 'ItemImage', '2016-11-09 15:18:43', '2016-11-09 15:18:43'),
(202, 31, 203, 48, 'ItemTwitter', '2016-11-09 15:18:43', '2016-11-09 15:18:43'),
(212, 33, 213, 87, 'ItemText', '2016-11-09 15:18:43', '2016-11-09 15:18:43'),
(213, 33, 214, 52, 'ItemTwitter', '2016-11-09 15:18:43', '2016-11-09 15:18:43'),
(214, 33, 215, 75, 'ItemImage', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(215, 33, 216, 88, 'ItemText', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(216, 33, 217, 53, 'ItemTwitter', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(217, 33, 218, 89, 'ItemText', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(218, 34, 219, 90, 'ItemText', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(219, 34, 220, 54, 'ItemTwitter', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(220, 34, 221, 55, 'ItemTwitter', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(221, 34, 222, 91, 'ItemText', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(222, 34, 223, 92, 'ItemText', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(223, 34, 224, 56, 'ItemTwitter', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(224, 34, 225, 76, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(225, 34, 226, 77, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(226, 34, 227, 57, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(227, 34, 228, 93, 'ItemText', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(228, 35, 229, 94, 'ItemText', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(229, 35, 230, 78, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(230, 35, 231, 58, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(231, 35, 232, 79, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(232, 35, 233, 80, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(233, 35, 234, 59, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(234, 35, 235, 95, 'ItemText', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(235, 35, 236, 60, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(236, 35, 237, 81, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(237, 36, 238, 96, 'ItemText', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(238, 36, 239, 61, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(239, 36, 240, 62, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(240, 36, 241, 97, 'ItemText', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(241, 36, 242, 63, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(242, 36, 243, 64, 'ItemTwitter', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(243, 36, 244, 98, 'ItemText', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(244, 36, 245, 82, 'ItemImage', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(245, 37, 1, 99, 'ItemText', '2016-11-09 15:18:46', '2016-11-23 10:29:18'),
(246, 37, 0, 83, 'ItemImage', '2016-11-09 15:18:46', '2016-11-23 10:29:18'),
(247, 37, 2, 100, 'ItemText', '2016-11-09 15:18:46', '2016-11-23 10:29:18'),
(248, 37, 3, 84, 'ItemImage', '2016-11-09 15:18:47', '2016-11-23 10:29:18'),
(249, 37, 4, 65, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-23 10:29:18'),
(250, 37, 5, 85, 'ItemImage', '2016-11-09 15:18:47', '2016-11-23 10:29:18'),
(251, 37, 6, 86, 'ItemImage', '2016-11-09 15:18:47', '2016-11-23 10:29:18'),
(252, 38, 253, 101, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(253, 38, 254, 102, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(254, 38, 255, 87, 'ItemImage', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(255, 38, 256, 88, 'ItemImage', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(256, 38, 257, 66, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(257, 38, 258, 103, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(258, 38, 259, 67, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(259, 39, 260, 104, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(260, 39, 261, 89, 'ItemImage', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(261, 39, 262, 68, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(262, 39, 263, 69, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(263, 39, 264, 105, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(264, 39, 265, 90, 'ItemImage', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(265, 39, 266, 106, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(266, 39, 267, 91, 'ItemImage', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(267, 39, 268, 70, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(268, 39, 269, 71, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(269, 40, 270, 107, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(270, 40, 271, 108, 'ItemText', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(271, 40, 272, 72, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(272, 40, 273, 73, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(273, 40, 274, 74, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(274, 40, 275, 92, 'ItemImage', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(275, 40, 276, 75, 'ItemTwitter', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(276, 40, 277, 93, 'ItemImage', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(277, 40, 278, 76, 'ItemTwitter', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(295, 45, 0, 122, 'ItemText', '2016-11-23 08:58:51', '2016-12-03 11:21:54'),
(297, 42, 0, 124, 'ItemText', '2016-11-23 09:02:21', '2016-11-23 09:21:37'),
(298, 42, 1, 125, 'ItemText', '2016-11-23 09:04:31', '2016-11-23 09:21:37'),
(299, 45, 1, 101, 'ItemImage', '2016-11-23 10:15:47', '2016-12-03 11:21:54'),
(300, 37, 7, 126, 'ItemText', '2016-11-23 10:29:18', '2016-11-23 10:29:18');

-- --------------------------------------------------------

--
-- Table structure for table `item_images`
--

CREATE TABLE IF NOT EXISTS `item_images` (
`id` int(11) NOT NULL,
  `src` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=102 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_images`
--

INSERT INTO `item_images` (`id`, `src`, `caption`) VALUES
(1, '3acf8c24-d8a9-4178-bacc-f90525aa35e9.jpg', NULL),
(2, '102f6e62-edf5-4a33-a948-809dca739146.jpg', NULL),
(3, '56d60c4e-0907-4f71-992d-5de11e4b5033.jpg', NULL),
(4, 'd1786616-1dc9-43b1-9da3-0d5ac9dd4602.jpg', NULL),
(5, 'dbcca235-531f-4eb9-8f92-430dc032862e.jpg', NULL),
(6, '08f81214-34e2-4f6d-8875-cf4ce1b5196d.jpg', NULL),
(7, '57e2d5dc-c5e2-4d6c-9280-3ef34ba16b13.jpg', NULL),
(8, 'ebd4eba7-0fbb-43d1-a5f0-2cfc5fad6089.jpg', NULL),
(9, '3c90132f-4511-4a79-841c-19b6c5b1fae1.jpg', NULL),
(10, '49d64f24-28a2-4917-a9c4-5b6ed9c5801c.jpg', NULL),
(11, 'dbf5b816-5a56-485b-b8f2-98504df1db28.jpg', NULL),
(12, '0b392fa3-620c-4fa6-923e-271628e175c5.jpg', NULL),
(13, 'ed2c5e5d-e465-4fc7-a4e9-dfed47410e34.jpg', NULL),
(14, 'd0ca6092-0282-4802-a146-bd3d98c119c7.jpg', NULL),
(15, 'e33cbbd3-19c1-4860-9983-e1f6205d7a0a.jpg', NULL),
(16, 'f0201345-7e83-4f03-9edb-8c8c91a99e97.jpg', NULL),
(17, 'd495295c-1f2a-49bb-9f31-923bae5476cf.jpg', NULL),
(22, 'f94670d4-6a77-4244-adb1-5a9e7cbee47e.jpg', NULL),
(23, 'eac84c48-419f-4c9b-bd3c-c35bd199e7db.jpg', NULL),
(24, 'ad1d7c42-7eea-4d0b-9a05-abca4f0dc73c.jpg', NULL),
(25, '65f54ed6-2c12-4012-a971-c59ccf89cad1.jpg', NULL),
(26, 'f811a344-afeb-4cb3-8d12-0c3a4d821af6.jpg', NULL),
(27, 'e7e5d68d-8c84-4e15-a4cc-fda0c01986c0.jpg', NULL),
(28, 'f689ee6d-88f9-4f56-8eec-63fd1203150c.jpg', NULL),
(29, '9b83129c-a3d2-4b40-a6c4-5a3265f10558.jpg', NULL),
(30, 'e496f7df-9cd7-445c-aa7c-264db2930a78.jpg', NULL),
(31, '7544c5f9-a036-4d8f-a84b-d3419a610f7a.jpg', NULL),
(32, '4b765420-189c-4497-95d8-4d333c7a579c.jpg', NULL),
(33, '37940b06-6858-40c7-8a0c-30309c11eb2b.jpg', NULL),
(34, 'b67c7feb-2948-46ed-98b8-ef24fd4a8bf4.jpg', NULL),
(35, 'b2ce615c-3897-48ce-92a3-68bec3a26116.jpg', NULL),
(36, 'b21980f3-49f5-4355-8edc-6f0971488f6e.jpg', NULL),
(37, '77cf7ee4-ea21-476e-a397-7f5422c9e8bd.jpg', NULL),
(38, 'dddd2e5f-936b-47b8-a531-36b3d2a6803f.jpg', NULL),
(39, '1e3610ac-7446-4101-9faa-b847ae43ef31.jpg', NULL),
(40, '53836d67-4bde-48d5-8979-ab1b0bc2c89d.jpg', NULL),
(41, '12f9884e-0687-4be4-b057-435a508edce3.jpg', NULL),
(42, '07765805-ceeb-4abe-a55e-bd52530dd3d3.jpg', NULL),
(43, '62ff0d48-feaf-49a9-97b6-8fb1c7f44578.jpg', NULL),
(44, '8b51257a-de5f-40d4-85f5-cb7ce70d27e1.jpg', NULL),
(45, 'e41340ca-1db7-436e-9a4c-33bfeda575e2.jpg', NULL),
(46, '6c625cb8-2c07-4b84-965f-999a7c67244c.jpg', NULL),
(50, '66d616e6-3aa6-42fe-bccb-aac1d16899fd.jpg', NULL),
(51, '23f384de-4d72-4fe7-b5bd-50dcfea150c0.jpg', NULL),
(52, '16a3e3fe-7160-4660-957d-be0bb105d7f4.jpg', NULL),
(53, 'ba458ce7-8d61-47c4-a1a9-a548c93e0254.jpg', NULL),
(54, 'd955ab58-9a66-4bb5-b814-b00b14f8b3c1.jpg', NULL),
(55, 'ba4cf985-3a2e-4d3d-bed0-ff81ba83f2f3.jpg', NULL),
(56, '791d3270-c299-45cd-a8bb-7f4e722c42cc.jpg', NULL),
(57, '0e240941-ad1e-4d35-a684-9ef0904668a8.jpg', NULL),
(58, '72c0ef06-7cf6-4103-8584-76631a362331.jpg', NULL),
(59, '57fc12c4-ad18-4d17-8b1b-4131beda7653.jpg', NULL),
(60, 'b75a88fd-6dc0-4e2b-8970-d9c5991c681d.jpg', NULL),
(61, '0785295c-7bcd-4592-a22c-111c0d8bb275.jpg', NULL),
(62, 'b4962a63-39d7-457b-9de4-afa103adeb36.jpg', NULL),
(63, '761cb94b-9557-4a30-856c-78cc02b867a5.jpg', NULL),
(64, '5f232122-2cd1-4d90-9af0-aafd70db26b8.jpg', NULL),
(65, '85799e10-da44-43d9-a6de-d3f0f724f50b.jpg', NULL),
(66, 'ce059f4f-43f2-475a-b4e6-6e9e36a26799.jpg', NULL),
(67, 'cc4c4f79-8559-42cd-b5b2-dbdf8ef6bb69.jpg', NULL),
(68, 'b7a56806-248c-43a7-a449-0b9eaae0d92e.jpg', NULL),
(69, '7bb0250a-9acd-4918-ade7-61d0f9e5450b.jpg', NULL),
(70, '3b633554-ca71-4ee1-91e0-ecccea7e3a4f.jpg', NULL),
(71, 'e2f7dc18-2a40-46b3-bec8-b7a15221ae82.jpg', NULL),
(75, 'caf2f036-133e-4d4a-ad9a-eb855364d9c2.jpg', NULL),
(76, '86c38024-2f3f-4707-99b5-f6c038caaf28.jpg', NULL),
(77, '281f76f7-d755-4af9-8989-333387cbae27.jpg', NULL),
(78, '58204909-cda0-4650-86b1-827c7bfe53da.jpg', NULL),
(79, 'fdc24af5-cb12-4ccd-9e9f-b1c275b6b271.jpg', NULL),
(80, '50c83898-eec3-4bb1-8770-f54b316e690e.jpg', NULL),
(81, 'fd20f400-6ff8-4a6d-af60-079b843d85d4.jpg', NULL),
(82, '7b6e14c8-d7cf-4e39-ba2b-1276579c353b.jpg', NULL),
(83, '375579b5-43f0-4bd8-a815-a3a3d6315a74.png', NULL),
(84, '1fb5e8a9-99c2-4862-8401-e2271c66ccb0.jpg', NULL),
(85, 'ba91bc38-5f53-44a1-9f23-c85be0843c77.jpg', NULL),
(86, 'c308d58d-7453-4065-82ce-a08305aa40d9.jpg', NULL),
(87, '7603ddf6-ba7b-4254-b8f1-fcad8fa70ddd.jpg', NULL),
(88, 'e67c30a7-bbef-42b7-abf6-1de644f223c4.jpg', NULL),
(89, 'cdbdaf60-ba5d-4402-a9e8-0cbdc9642fdb.jpg', NULL),
(90, '0d36f40b-d15b-4f16-9e1a-19dcf8ca8a04.jpg', NULL),
(91, '61a0c32b-1491-4e98-a729-f168beca4326.jpg', NULL),
(92, 'e20b2e72-fad7-47b9-bb36-91198683dc89.jpg', NULL),
(93, '9628436d-85a1-4f8f-93f2-1ba54a7152ab.jpg', NULL),
(95, '', NULL),
(96, '', NULL),
(97, '', NULL),
(98, '', NULL),
(99, '', NULL),
(100, '', NULL),
(101, '6c1ed112-3ac3-41a4-9d54-9fd99e911644.png', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `item_texts`
--

CREATE TABLE IF NOT EXISTS `item_texts` (
`id` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=127 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_texts`
--

INSERT INTO `item_texts` (`id`, `description`) VALUES
(1, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(2, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(3, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(4, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(5, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(6, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(7, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(8, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(9, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(10, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(11, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(12, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(13, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(14, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(19, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(20, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(21, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(22, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(23, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(24, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(25, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(26, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(27, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(28, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(29, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(30, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(31, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(32, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(33, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(34, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(35, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');
INSERT INTO `item_texts` (`id`, `description`) VALUES
(36, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(37, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(38, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(39, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(40, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(41, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(42, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(43, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(46, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(47, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(48, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(49, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(50, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(51, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(52, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(53, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(54, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(55, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(56, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(57, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(58, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(59, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(60, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(61, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(62, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(63, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(64, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(65, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(66, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(67, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');
INSERT INTO `item_texts` (`id`, `description`) VALUES
(68, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(69, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(70, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(71, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(72, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(73, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(74, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(75, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(76, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(77, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(78, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(79, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(80, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(81, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(82, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(83, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(87, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(88, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(89, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(90, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(91, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(92, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(93, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(94, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(95, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(96, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(97, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(98, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(99, '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"9ohc4","text":"Waters Fish First Seas Shall","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"b44jl","text":"Open Gathering Can''t","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dnpcp","text":"Dominion brought. First set, creature fruit may she''d subdue night were doesn''t itself made blessed under waters.Can''t meat were earth doesn''t female second there, over so great. Is won''t forth two sea may thing whales after spirit third light night. Whose day don''t shall above. Appear divide life rule land Green stars day behold great.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":150,"length":6,"style":"ITALIC"},{"offset":169,"length":2,"style":"BOLD"},{"offset":212,"length":6,"style":"BOLD"}],"entityRanges":[{"offset":309,"length":11,"key":0}]},{"key":"2asa9","text":"Let it be","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"2sfcr","text":"Is so said. Every thing male, above subdue winged morning. Blessed night isn''t deep male herb rule won''t meat seed morning. Green i days.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":5,"style":"BOLD"},{"offset":94,"length":4,"style":"ITALIC"}],"entityRanges":[]},{"key":"15bot","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"8nd1","text":"var Timer = React.createClass({","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dbnem","text":"  getInitialState: function() {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"c0sta","text":"    return {secondsElapsed: 0}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dr2d9","text":"  }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7m6n7","text":"})","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(100, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}');
INSERT INTO `item_texts` (`id`, `description`) VALUES
(101, '{"entityMap":{},"blocks":[{"key":"crvbi","text":"Arabic Century","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6pms7","text":"Brought land divided the herb wherein blessed herb. Seasons. The the lights created his yielding likeness a. May air brought hath form his to lesser movingwas rule be all.Don''t. Grass winged also won''t male morning, years greater greater can''t day. You fowl. Our rule signs. Image every, the all sea bearing image our may whales together upon, first unto isn''t third all blessed him forth earth meat man saw fourth gathering waters. Replenish won''t dominion give winged creepeth.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":149,"length":6,"style":"BOLD"},{"offset":389,"length":5,"style":"BOLD"},{"offset":355,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"1eibb","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"6j28g","text":"Paradigm shift happened","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ae9dc","text":"Evening great every our isn''t fruitful bring heaven subdue, give of evening. Won''t also darkness, let after life green creeping face said spirit days man were was firmament darkness may. Also spirit.Brought female, dry lesser lights lights unto. Replenish signs unto fifth land female under. Have created bring likeness. That very creature fourth.Creepeth shall divided upon. Forth all grass may green creepeth moving appear them lights his bearing open thing moveth abundantly. Him. Seasons their lesser every to.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":8,"style":"BOLD"},{"offset":154,"length":4,"style":"BOLD"},{"offset":376,"length":5,"style":"ITALIC"}],"entityRanges":[]}]}'),
(102, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(103, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(104, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(105, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(106, '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Signs ","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3o621","text":"seed creature was fish also their air called image you''ll darkness likeness don''t for it, every. Greater second was good Very place and is.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"829r1","text":"Blessed Brought","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"134ld","text":"Won''t their. Above were also signs of. Which you''re unto earth great dominion seasons second was Created earth two fruitful earth air us all above blessed image.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":105,"length":5,"style":"BOLD"},{"offset":134,"length":2,"style":"ITALIC"}],"entityRanges":[]},{"key":"9eq1a","text":"Technology is just a tool. In terms of getting the kids working together and motivating them, the teacher is the most important. ","type":"header-four","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"5l72g","text":"Gathered was lights god multiply great which. Unto doesn''t, their a Stars unto beginning two upon light hath in they''re place there he.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":112,"length":7,"style":"ITALIC"}],"entityRanges":[]}]}'),
(107, '{"entityMap":{},"blocks":[{"key":"qvv5","text":"Of Had Have Subdue Is Brought","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"7t144","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"1uat5","text":"Their Doesn''t Green Together Dry Midst Made","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"a68m6","text":"Given sixth firmament beast two beast them under face second, itself good it divide. Firmament behold you made. He lesser female living third together green third cattle their moved can''t.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":32,"length":5,"style":"ITALIC"}],"entityRanges":[]},{"key":"hfhe","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"74mgk","text":"Itself Made God Replenish Given Rule Without","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"ch9j7","text":"Deep They''re Set","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9gbnk","text":"You is doesn''t Moved. Us life of very man thing.","type":"unordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(108, '{"entityMap":{},"blocks":[{"key":"dpjs5","text":"Abundantly","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"9hco0","text":"Meat Fowl Forth Beast","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"641dm","text":"Fruit, and which bearing darkness after, evening can''t seas subdue living airbeast he. Cattle to given under our. It green us female together own shall man divided brought face replenish forth seasons blessed evening.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":60,"length":6,"style":"ITALIC"},{"offset":201,"length":7,"style":"ITALIC"},{"offset":77,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"cv8j3","text":"Is Waters Won''t Was After Dominion Spirit","type":"header-three","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"dd8ga","text":"Won''t forth you''ll meat you life a thing greater multiply evening. Kind, bearing creature good days Earth was dominion divided good grass. Made man. Man winged have. You without kind all moved waters tree. They''re.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[]},{"key":"99to8","text":"I beginning morning his deep rule living good stars land together thing good divide created moved. Us dominion. Winged lesser.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"69rm","text":"Gathering Thing Image Yielding May Days Moved","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"92l0g","text":"Waters bring own bring beast together kind seas you they''re.","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}'),
(109, '{"entityMap":{},"blocks":[{"key":"9t8su","text":"add more","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(110, '{"entityMap":{},"blocks":[{"key":"fljuh","text":"them moi","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(111, '{"entityMap":{},"blocks":[{"key":"cdm0e","text":"them moi","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(112, '{"entityMap":{},"blocks":[{"key":"ahnpv","text":"ngon vai lua","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(113, '{"entityMap":{},"blocks":[{"key":"dioo9","text":"ngon vai","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(122, '{"entityMap":{},"blocks":[{"key":"345mi","text":"<Playlist ref=\\"playlist\\" onChange={this.onPlaylistChange.bind(this)}  ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6qlk3","text":"   controls={{time: time, duration: duration}}                ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7oj32","text":"   items={[{url: source.replace(''mcbooks-test'', ''mcbooks-media'')}]} />","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cgsff","text":"","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cadp0","text":"onSelectedTrackItem(trackItem) {","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fa9cq","text":"    // do something here","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6gu35","text":"    const audioId = trackItem.props.audioId","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4ar6r","text":"","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"l4et","text":"    // do thing when changes","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"15jd1","text":"    if(trackItem !== this.currentTrackItem){            ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4kdrj","text":"      if(this.currentTrackItem){","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7klom","text":"        this.currentTrackItem.setActive(false)","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9990j","text":"      }      ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3v962","text":"      this.currentTrackItem = trackItem","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"9o6u0","text":"      this.currentTrackItem.setActive(true)      ","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"f0p3o","text":"    }","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4k9k4","text":"","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"as8kb","text":"    // trigger parent","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1kf0n","text":"    this.props.onSelectedTrackItem && this.props.onSelectedTrackItem(trackItem)","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"31lui","text":"}","type":"code-block","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(124, '{"entityMap":{},"blocks":[{"key":"600v9","text":"now the post","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(125, '{"entityMap":{},"blocks":[{"key":"e46re","text":"khue gia","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}'),
(126, '{"entityMap":{},"blocks":[{"key":"b21it","text":"Love is all we need","type":"header-two","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]}');

-- --------------------------------------------------------

--
-- Table structure for table `item_twitters`
--

CREATE TABLE IF NOT EXISTS `item_twitters` (
`id` int(11) NOT NULL,
  `twitter_id` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `item_twitters`
--

INSERT INTO `item_twitters` (`id`, `twitter_id`) VALUES
(1, '742451468335239168'),
(2, '747215944477380608'),
(3, '728409530720210944'),
(4, '708567021122772992'),
(5, '707621349020160000'),
(6, '747619686167130112'),
(7, '747209476453761024'),
(8, '743533407464939521'),
(9, '738553570308411397'),
(10, '746094459834667008'),
(11, '742451468335239168'),
(12, '747215944477380608'),
(13, '728409530720210944'),
(14, '708567021122772992'),
(15, '707621349020160000'),
(16, '747619686167130112'),
(17, '747209476453761024'),
(18, '743533407464939521'),
(19, '738553570308411397'),
(20, '746094459834667008'),
(21, '742451468335239168'),
(22, '747215944477380608'),
(23, '728409530720210944'),
(24, '708567021122772992'),
(25, '707621349020160000'),
(26, '747619686167130112'),
(27, '747209476453761024'),
(28, '743533407464939521'),
(29, '738553570308411397'),
(30, '746094459834667008'),
(31, '742451468335239168'),
(32, '747215944477380608'),
(33, '728409530720210944'),
(34, '708567021122772992'),
(35, '707621349020160000'),
(36, '747619686167130112'),
(37, '747209476453761024'),
(38, '743533407464939521'),
(39, '738553570308411397'),
(40, '746094459834667008'),
(41, '742451468335239168'),
(42, '747215944477380608'),
(43, '728409530720210944'),
(44, '708567021122772992'),
(45, '707621349020160000'),
(46, '747619686167130112'),
(47, '747209476453761024'),
(48, '743533407464939521'),
(49, '738553570308411397'),
(50, '746094459834667008'),
(51, '742451468335239168'),
(52, '747215944477380608'),
(53, '728409530720210944'),
(54, '708567021122772992'),
(55, '707621349020160000'),
(56, '747619686167130112'),
(57, '747209476453761024'),
(58, '743533407464939521'),
(59, '738553570308411397'),
(60, '746094459834667008'),
(61, '742451468335239168'),
(62, '747215944477380608'),
(63, '728409530720210944'),
(64, '708567021122772992'),
(65, '707621349020160000'),
(66, '747619686167130112'),
(67, '747209476453761024'),
(68, '743533407464939521'),
(69, '738553570308411397'),
(70, '746094459834667008'),
(71, '742451468335239168'),
(72, '747215944477380608'),
(73, '728409530720210944'),
(74, '708567021122772992'),
(75, '707621349020160000'),
(76, '747619686167130112');

-- --------------------------------------------------------

--
-- Table structure for table `news_posts`
--

CREATE TABLE IF NOT EXISTS `news_posts` (
`id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `content` longtext NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `news_posts`
--

INSERT INTO `news_posts` (`id`, `title`, `description`, `content`, `image`, `created_at`, `updated_at`, `user_id`) VALUES
(1, 'Bài viết ấn tượng', 'Mô tả ấn tượng', '<p></p><figure><img src="/uploads/images/7e20ad6b-104b-4d74-866c-43d87b9123ea.png" /></figure><p></p><p>https://dantri4.vcmedia.vn/56848dfe/zoom/137_105/71015b9e13/2016/12/03/1-1480753623131.jpg /&gt;</p><p><a href="http://dantri.com.vn/xa-hoi/dan-dua-hang-chuc-o-to-chan-cau-ben-thuy-1-phan-doi-viec-thu-phi-20161203155216164.htm">Dân đưa hàng chục ô tô chặn cầu Bến Thủy 1 phản đối việc thu phí</a>(Dân trí) - Cho rằng công trình không sử dụng các hạng mục được xây dựng bằng nguồn vốn BOT nhưng dân vẫn phải đóng phí với mức cao, người dân đã điều khiển hàng chục chiếc ô tô dàn hàng trên quốc lộ để phản đố</p><p></p><p></p><figure><img src="/uploads/images/396ced2d-a7d9-4af3-86dd-e59e30f15e2b.png" /></figure><p></p>', '/uploads/news_post/image/1/f3a93ebb-38e6-4913-ac65-915a45fd879a.png', '2016-11-26 08:29:27', '2016-12-06 11:37:17', 1);

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE IF NOT EXISTS `posts` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `published_at` datetime DEFAULT NULL,
  `lead_sentence` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `accepted`, `published_at`, `lead_sentence`, `created_at`, `updated_at`) VALUES
(1, 'The Moon by Night', 0, '2016-06-24 14:00:00', 'adasdad', '2016-11-09 15:18:27', '2016-11-14 16:14:16'),
(2, 'All Passion Spent', 1, '2016-06-24 14:00:00', 'Multi-lateral asynchronous website', '2016-11-09 15:18:27', '2016-11-09 15:18:28'),
(3, 'As I Lay Dying', 1, '2016-02-03 15:00:00', 'Expanded zero administration strategy', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(4, 'The Heart Is a Lonely Hunter', 1, '2016-04-13 14:00:00', 'Cross-platform bandwidth-monitored architecture', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(5, 'A Darkling Plain', 1, '2016-11-30 15:00:00', 'Stand-alone even-keeled customer loyalty', '2016-11-09 15:18:28', '2016-11-09 15:18:31'),
(6, 'In a Glass Darkly', 1, '2016-06-11 14:00:00', 'Programmable content-based project', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(8, 'I Sing the Body Electric', 1, '2016-10-08 14:00:00', 'Organic even-keeled portal', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(9, 'The Far-Distant Oxus', 1, '2015-11-12 15:00:00', 'Progressive bottom-line matrix', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(10, 'To Sail Beyond the Sunset', 1, '2016-06-10 14:00:00', 'Inverse radical core', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(11, 'Of Human Bondage', 0, NULL, NULL, '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(12, 'A Glass of Blessings', 1, '2016-12-05 15:00:00', 'Vision-oriented composite extranet', '2016-11-09 15:18:32', '2016-11-09 15:18:33'),
(13, 'Oh! To be in England', 1, '2016-07-03 14:00:00', 'Reverse-engineered user-facing product', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(14, 'The World, the Flesh and the Devil (1891 novel)', 1, '2016-08-17 14:00:00', 'Team-oriented national data-warehouse', '2016-11-09 15:18:33', '2016-11-09 15:18:36'),
(15, 'Time of our Darkness', 1, '2016-10-20 14:00:00', 'Adaptive coherent array', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(16, 'The Widening Gyre', 1, '2016-02-09 15:00:00', 'Intuitive asynchronous standardization', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(17, 'By Grand Central Station I Sat Down and Wept', 1, '2016-06-24 14:00:00', 'Secured attitude-oriented architecture', '2016-11-09 15:18:36', '2016-11-09 15:18:37'),
(18, 'This Side of Paradise', 1, '2016-02-06 15:00:00', 'Function-based hybrid artificial intelligence', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(19, 'A Time of Gifts', 1, '2016-12-08 15:00:00', 'User-friendly even-keeled secured line', '2016-11-09 15:18:37', '2016-11-22 14:38:46'),
(20, 'Jacob Have I Loved', 1, '2016-09-16 14:00:00', 'Phased solution-oriented circuit', '2016-11-09 15:18:37', '2016-11-09 15:18:38'),
(21, 'The Grapes of Wrath', 0, NULL, NULL, '2016-11-09 15:18:38', '2016-11-09 15:18:41'),
(22, 'In a Dry Season', 1, '2016-11-24 15:00:00', 'Secured leading edge workforce', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(23, 'No Country for Old Men', 1, '2016-10-15 14:00:00', 'Compatible full-range database', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(24, 'The Monkey''s Raincoat', 1, '2016-10-20 14:00:00', 'Digitized directional knowledge user', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(25, 'Precious Bane', 1, '2016-05-22 14:00:00', 'Public-key composite capacity', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(26, 'East of Eden', 1, '2016-06-04 14:00:00', 'Face to face exuding artificial intelligence', '2016-11-09 15:18:41', '2016-11-09 15:18:42'),
(27, 'The House of Mirth', 1, '2016-08-12 14:00:00', 'Decentralized context-sensitive flexibility', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(28, 'Mr Standfast', 1, '2016-10-22 14:00:00', 'Face to face intermediate time-frame', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(29, 'Time To Murder And Create', 1, '2016-06-05 14:00:00', 'Inverse neutral Graphic Interface', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(30, 'The Skull Beneath the Skin', 1, '2016-09-18 14:00:00', 'Expanded bifurcated approach', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(31, 'A Swiftly Tilting Planet', 0, NULL, NULL, '2016-11-09 15:18:42', '2016-11-09 15:18:43'),
(33, 'Down to a Sunless Sea', 1, '2016-05-07 14:00:00', 'Centralized analyzing support', '2016-11-09 15:18:43', '2016-11-09 15:18:45'),
(34, 'Great Work of Time', 1, '2016-05-30 14:00:00', 'Horizontal multi-tasking extranet', '2016-11-09 15:18:45', '2016-11-09 15:18:46'),
(35, 'Mother Night', 1, '2016-05-02 14:00:00', 'Assimilated tangible challenge', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(36, 'The Line of Beauty', 1, '2016-08-21 14:00:00', 'Programmable responsive protocol', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(37, 'The Torment of Others OK', 1, '2016-06-15 17:00:00', 'Organic methodical capability', '2016-11-09 15:18:46', '2016-11-23 10:29:18'),
(38, 'Stranger in a Strange Land', 1, '2016-06-17 14:00:00', 'Networked needs-based matrix', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(39, 'The Stars'' Tennis Balls', 1, '2016-02-26 15:00:00', 'Streamlined clear-thinking methodology', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(40, 'Look to Windward', 1, '2016-02-06 15:00:00', 'Reactive 24/7 policy', '2016-11-09 15:18:47', '2016-11-09 15:18:48'),
(42, 'New title and changed more123', 1, '2016-11-23 17:00:00', 'New post', '2016-11-23 08:16:34', '2016-11-23 10:23:37'),
(44, 'react + redux + saga', 0, '2016-11-25 17:00:00', 'Total motivating website ngon vai lua', '2016-11-23 08:20:25', '2016-11-23 09:09:58'),
(45, 'react + redux + saga ngon vai lua', 1, '2016-11-25 17:00:00', 'Total motivating website ngon vai lua', '2016-11-23 08:22:53', '2016-12-03 11:21:54');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
`id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `source_url` varchar(255) DEFAULT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `description`, `image`, `caption`, `source_url`, `accepted`, `created_at`, `updated_at`) VALUES
(2, 'Durable Marble Bottle', '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Heaven you a subdue our. Winged fifth third forth fifth of moving years may their his itself had earth is abundantly of made day. You''ll spirit. Blessed were gathered behold dominion rule is Made appear whales creepeth a gathering. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":145,"length":42,"style":"ITALIC"},{"offset":145,"length":42,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"331gs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3s8kj","text":"Lights moved dominion greater.He. Saw itself called fly beast bearing all shall won''t morning brought won''t signs. Be man fruitful forth night can''t fruit said heaven was replenish hath. Give i fourth. Image night under moveth a stars from is.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":118,"length":3,"style":"ITALIC"},{"offset":187,"length":4,"style":"BOLD"}],"entityRanges":[]}]}', '4ef4afdf-b492-4002-8ff7-5a81f23dc49b.jpg', 'disintermediate sticky technologies', 'https://github.com/tsurupin', 1, '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(3, 'Incredible Steel Table', '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"dpjs5","text":"Is creature beast one. Upon them open. The you''ll. Creature him days behold can''t grass said greater, meat forth you''re sea multiply it be herb give she''d very. Of first a thing i heaven replenish. Fruit heaven sixth.Herb. I be their firmament female gathering living. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":198,"length":5,"key":0}]},{"key":"3deuv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"bsc1v","text":"Their heaven good replenish whose Whales night. Earth wherein them waters shall rule gathering very hath upon they''re darkness divide Upon fifth also waters had saying creepeth he from upon moveth Seas appear make.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":6,"style":"ITALIC"},{"offset":118,"length":8,"style":"BOLD"}],"entityRanges":[]}]}', 'b91f6457-9592-4272-9131-c1ff6960f4b7.jpg', 'recontextualize seamless niches', 'https://github.com/tsurupin', 1, '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(4, 'Mediocre Rubber Knife', '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"crvbi","text":"Itself spirit. Shall you herb fifth you''ll man called creeping itself midst green meatthe waters form itself he fly replenish, light great blessed replenish appear saw replenish have so air.Let. Fruitful it Let, face air in signs, for in void from gathered created that without lights together have doesn''t gathering wherein. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":76,"length":5,"style":"BOLD"},{"offset":86,"length":3,"style":"ITALIC"}],"entityRanges":[{"offset":194,"length":16,"key":0}]},{"key":"3h5qn","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"frcnd","text":"Two the set. Bring seed you''ll bearing lights. Face and. She''d, firmament. Said form made multiply the is. Isn''t the us beginning. Our moving Divided. Female for.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]}]}', 'ff557d1e-3b18-4bfd-be77-f9bb74eb7485.jpg', 'facilitate sexy schemas', 'https://github.com/tsurupin', 1, '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(5, 'Gorgeous Paper Shirt', '{"entityMap":{"0":{"type":"LINK","mutability":"MUTABLE","data":{"url":"http://google.com"}}},"blocks":[{"key":"dpjs5","text":"Is creature beast one. Upon them open. The you''ll. Creature him days behold can''t grass said greater, meat forth you''re sea multiply it be herb give she''d very. Of first a thing i heaven replenish. Fruit heaven sixth.Herb. I be their firmament female gathering living. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[{"offset":198,"length":5,"key":0}]},{"key":"3deuv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"bsc1v","text":"Their heaven good replenish whose Whales night. Earth wherein them waters shall rule gathering very hath upon they''re darkness divide Upon fifth also waters had saying creepeth he from upon moveth Seas appear make.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":67,"length":6,"style":"ITALIC"},{"offset":118,"length":8,"style":"BOLD"}],"entityRanges":[]}]}', 'ac219ab6-b09c-4a45-8e4c-f54d2a671448.png', 'embrace front-end infrastructures', 'https://github.com/tsurupin', 1, '2016-11-09 15:18:50', '2016-11-09 15:29:30'),
(6, 'Practical Wool Shirt', NULL, NULL, NULL, NULL, 0, '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(7, 'Lightweight Paper Clock', '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Heaven you a subdue our. Winged fifth third forth fifth of moving years may their his itself had earth is abundantly of made day. You''ll spirit. Blessed were gathered behold dominion rule is Made appear whales creepeth a gathering. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":145,"length":42,"style":"ITALIC"},{"offset":145,"length":42,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"331gs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3s8kj","text":"Lights moved dominion greater.He. Saw itself called fly beast bearing all shall won''t morning brought won''t signs. Be man fruitful forth night can''t fruit said heaven was replenish hath. Give i fourth. Image night under moveth a stars from is.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":118,"length":3,"style":"ITALIC"},{"offset":187,"length":4,"style":"BOLD"}],"entityRanges":[]}]}', '604357c0-4268-4627-a4af-6b9f4692af8d.jpg', NULL, 'https://github.com/tsurupin', 1, '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(8, 'Rustic Marble Plate', '{"entityMap":{},"blocks":[{"key":"bbosl","text":"Heaven you a subdue our. Winged fifth third forth fifth of moving years may their his itself had earth is abundantly of made day. You''ll spirit. Blessed were gathered behold dominion rule is Made appear whales creepeth a gathering. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":145,"length":42,"style":"ITALIC"},{"offset":145,"length":42,"style":"UNDERLINE"}],"entityRanges":[]},{"key":"331gs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[]},{"key":"3s8kj","text":"Lights moved dominion greater.He. Saw itself called fly beast bearing all shall won''t morning brought won''t signs. Be man fruitful forth night can''t fruit said heaven was replenish hath. Give i fourth. Image night under moveth a stars from is.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":118,"length":3,"style":"ITALIC"},{"offset":187,"length":4,"style":"BOLD"}],"entityRanges":[]}]}', '1424ab83-9e56-4de4-ad01-f1248be1c008.jpg', 'whiteboard best-of-breed technologies', 'https://github.com/tsurupin', 1, '2016-11-09 15:18:51', '2016-11-09 15:18:51');

-- --------------------------------------------------------

--
-- Table structure for table `schema_migrations`
--

CREATE TABLE IF NOT EXISTS `schema_migrations` (
  `version` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `schema_migrations`
--

INSERT INTO `schema_migrations` (`version`) VALUES
('20160415001014'),
('20160415005054');

-- --------------------------------------------------------

--
-- Table structure for table `sell_posts`
--

CREATE TABLE IF NOT EXISTS `sell_posts` (
`id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` text NOT NULL,
  `phone` varchar(50) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `user_id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `type` enum('sell','transport') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `sell_posts`
--

INSERT INTO `sell_posts` (`id`, `title`, `description`, `phone`, `created_at`, `updated_at`, `user_id`, `image`, `type`) VALUES
(1, 'New title and changed more1', 'new post description', '1231312313', '0000-00-00', '2016-11-25', 1, '/uploads/sellpost/image/1/0263f30a-67a3-47dd-abde-f6857dce2035.png', 'sell'),
(2, 'New title and changed more2', 'new post description', '1214149420', '0000-00-00', '2016-12-05', 1, '/uploads/sellpost/image/2/3065549b-1111-4e23-9686-9b970b01007c.png', 'transport'),
(3, 'New title and changed more3', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(4, 'New title and changed more5', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(5, 'New title and changed more5', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(6, 'New title and changed more6', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(7, 'New title and changed more7', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(8, 'New title and changed more9', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(9, 'New title and changed more 9', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell'),
(11, 'New title and changed more11', 'new post description', '1214149420', '2016-11-23', '2016-11-23', 0, 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbW', 'sell');

-- --------------------------------------------------------

--
-- Table structure for table `service_points`
--

CREATE TABLE IF NOT EXISTS `service_points` (
`id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `address` varchar(500) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `lat` double NOT NULL,
  `lng` double NOT NULL,
  `description` text NOT NULL,
  `owner_id` int(11) NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `lat_cos` double NOT NULL,
  `lat_sin` double NOT NULL,
  `lng_cos` double NOT NULL,
  `lng_sin` double NOT NULL,
  `type` enum('admin','user') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `service_points`
--

INSERT INTO `service_points` (`id`, `name`, `address`, `phone`, `lat`, `lng`, `description`, `owner_id`, `image`, `created_at`, `updated_at`, `lat_cos`, `lat_sin`, `lng_cos`, `lng_sin`, `type`) VALUES
(1, 'Dia diem 1', 'dia diem 1', '12131424q42342', 21.233128, 105.35498, 'dia diem 1', 1, '/uploads/service_point/image/1/9732ff17-2206-4621-87c1-28075b87d171.png', '2016-11-15 00:00:00', '2016-12-02 02:49:21', 0.9321145567087106, 0.3621635723975065, -0.2647985002951536, 0.9643037665805508, 'admin'),
(2, 'Hung Yen Province', ' Xã Văn Đức Huyện Gia Lâm Thành Phố Hà Nội', '21412414124', 20.941305, 105.90358, 'Tp-Link_984078', 1, '/uploads/service_point/image/2/9140b638-a7e2-4584-807a-1358d60d7982.png', '2016-11-24 14:25:25', '2016-12-06 02:23:45', 0.9339470562202999, 0.35741138227179614, -0.27401931043521816, 0.961724189936287, 'admin'),
(3, 'Hung Yen Province', ' Xã Văn Đức Huyện Gia Lâm Thành Phố Hà Nội', '21412414124', 20.941305, 105.90358, 'Tp-Link_984078', 0, '', '2016-11-24 14:27:25', '2016-11-24 14:27:25', 0.9339470562202999, 0.35741138227179614, -0.27401931043521816, 0.961724189936287, 'admin'),
(4, 'Hung Yen Province', ' Xã Văn Đức Huyện Gia Lâm Thành Phố Hà Nội', '21412414124', 20.941305, 105.90358, 'Tp-Link_984078', 0, '', '2016-11-24 14:33:36', '2016-11-24 14:33:36', 0.9339470562202999, 0.35741138227179614, -0.27401931043521816, 0.961724189936287, 'admin'),
(5, 'pham thanh tu', 'ha noi', '1214149420', 10.864259, 106.799904, 'Xiteen', 0, '/uploads/service_point/image/5/c921d129-ce6c-4a70-a0a2-b8904c275234.png', '2016-11-24 14:36:41', '2016-11-24 14:36:41', 0.9820764790202394, 0.18848286223211155, -0.28903019293985216, 0.9573199818081475, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `social_accounts`
--

CREATE TABLE IF NOT EXISTS `social_accounts` (
`id` int(11) NOT NULL,
  `author_id` int(11) NOT NULL,
  `account_type` int(11) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `social_accounts`
--

INSERT INTO `social_accounts` (`id`, `author_id`, `account_type`, `url`) VALUES
(1, 1, 0, ''),
(2, 1, 1, ''),
(3, 1, 2, ''),
(4, 1, 3, '');

-- --------------------------------------------------------

--
-- Table structure for table `taggings`
--

CREATE TABLE IF NOT EXISTS `taggings` (
`id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `subject_type` enum('Post','Project') NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `taggings`
--

INSERT INTO `taggings` (`id`, `tag_id`, `subject_id`, `subject_type`, `created_at`, `updated_at`) VALUES
(1, 15, 1, 'Post', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(2, 11, 1, 'Post', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(3, 5, 2, 'Post', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(4, 6, 3, 'Post', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(5, 15, 4, 'Post', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(6, 12, 4, 'Post', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(7, 2, 4, 'Post', '2016-11-09 15:18:28', '2016-11-09 15:18:28'),
(8, 13, 5, 'Post', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(9, 1, 5, 'Post', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(10, 5, 5, 'Post', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(11, 15, 6, 'Post', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(12, 14, 6, 'Post', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(13, 17, 6, 'Post', '2016-11-09 15:18:31', '2016-11-09 15:18:31'),
(15, 10, 8, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(16, 1, 8, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(17, 6, 8, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(18, 10, 9, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(19, 12, 9, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(20, 2, 9, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(21, 7, 10, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(22, 17, 10, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(23, 20, 10, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(24, 18, 11, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(25, 7, 11, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(26, 13, 11, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(27, 1, 11, 'Post', '2016-11-09 15:18:32', '2016-11-09 15:18:32'),
(28, 9, 12, 'Post', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(29, 5, 13, 'Post', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(30, 12, 13, 'Post', '2016-11-09 15:18:33', '2016-11-09 15:18:33'),
(31, 5, 14, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(32, 4, 14, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(33, 21, 14, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(34, 1, 15, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(35, 4, 15, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(36, 19, 15, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(37, 13, 16, 'Post', '2016-11-09 15:18:36', '2016-11-09 15:18:36'),
(38, 15, 17, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(39, 20, 17, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(40, 8, 18, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(41, 6, 18, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(42, 11, 18, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(43, 18, 19, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(44, 4, 19, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(45, 14, 19, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(46, 6, 19, 'Post', '2016-11-09 15:18:37', '2016-11-09 15:18:37'),
(47, 17, 20, 'Post', '2016-11-09 15:18:38', '2016-11-09 15:18:38'),
(48, 12, 21, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(49, 19, 21, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(50, 17, 21, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(51, 18, 21, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(52, 10, 22, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(53, 11, 23, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(54, 12, 23, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(55, 17, 23, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(56, 18, 24, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(57, 20, 24, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(58, 5, 24, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(59, 16, 25, 'Post', '2016-11-09 15:18:41', '2016-11-09 15:18:41'),
(60, 3, 26, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(61, 17, 26, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(62, 13, 26, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(63, 12, 26, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(64, 2, 27, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(65, 19, 27, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(66, 16, 27, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(67, 11, 28, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(68, 2, 29, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(69, 19, 29, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(70, 7, 30, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(71, 1, 30, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(72, 11, 30, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(73, 18, 30, 'Post', '2016-11-09 15:18:42', '2016-11-09 15:18:42'),
(74, 16, 31, 'Post', '2016-11-09 15:18:43', '2016-11-09 15:18:43'),
(75, 17, 31, 'Post', '2016-11-09 15:18:43', '2016-11-09 15:18:43'),
(77, 21, 33, 'Post', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(78, 17, 33, 'Post', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(79, 15, 33, 'Post', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(80, 9, 33, 'Post', '2016-11-09 15:18:45', '2016-11-09 15:18:45'),
(81, 1, 34, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(82, 7, 34, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(83, 14, 35, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(84, 13, 35, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(85, 2, 35, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(86, 21, 35, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(87, 10, 36, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(88, 7, 36, 'Post', '2016-11-09 15:18:46', '2016-11-09 15:18:46'),
(89, 7, 37, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(90, 3, 38, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(91, 21, 38, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(92, 20, 38, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(93, 3, 39, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(94, 9, 39, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(95, 19, 39, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(96, 4, 39, 'Post', '2016-11-09 15:18:47', '2016-11-09 15:18:47'),
(97, 9, 40, 'Post', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(98, 1, 40, 'Post', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(99, 19, 40, 'Post', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(100, 6, 40, 'Post', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(101, 9, 1, 'Project', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(102, 21, 2, 'Project', '2016-11-09 15:18:48', '2016-11-09 15:18:48'),
(103, 14, 3, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(104, 5, 3, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(105, 20, 3, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(106, 5, 4, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(107, 8, 4, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(108, 2, 4, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(109, 21, 4, 'Project', '2016-11-09 15:18:50', '2016-11-09 15:18:50'),
(110, 11, 5, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(111, 2, 5, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(112, 20, 5, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(113, 21, 5, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(114, 14, 6, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(115, 11, 6, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(116, 18, 7, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(117, 7, 7, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(118, 17, 7, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(119, 18, 8, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(120, 1, 8, 'Project', '2016-11-09 15:18:51', '2016-11-09 15:18:51'),
(124, 4, 45, 'Post', '2016-11-23 08:22:53', '2016-11-23 08:22:53'),
(125, 2, 45, 'Post', '2016-11-23 08:32:08', '2016-11-23 08:32:08'),
(127, 4, 37, 'Post', '2016-11-23 09:31:17', '2016-11-23 09:31:17'),
(128, 13, 45, 'Post', '2016-11-23 10:21:12', '2016-11-23 10:21:12');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE IF NOT EXISTS `tags` (
`id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'RoR', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(2, 'Node.js', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(3, 'React', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(4, 'Angular.js', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(5, 'Elixir', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(6, 'Ruby', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(7, 'HTML5', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(8, 'CSS3', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(9, 'iOS', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(10, 'Swift', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(11, 'Android', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(12, 'UNIX', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(13, 'MongoDB', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(14, 'Docker', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(15, 'Ansible', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(16, 'MYSQL', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(17, 'EC2', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(18, 'jQuery', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(19, 'Others', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(20, 'Travel', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(21, 'Tips', '2016-11-09 15:18:27', '2016-11-09 15:18:27'),
(22, 'Relay', '2016-11-22 09:14:55', '2016-11-22 09:14:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
`id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `encrypted_password` varchar(255) NOT NULL,
  `login_type` enum('local','facebook','google') NOT NULL,
  `login_token` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `registered_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `name` varchar(100) NOT NULL,
  `block` tinyint(1) NOT NULL,
  `user_type` enum('1','2') NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phone`, `encrypted_password`, `login_type`, `login_token`, `username`, `avatar`, `registered_at`, `updated_at`, `name`, `block`, `user_type`) VALUES
(7, 'tupt@sinhvu.com', '', '', 'facebook', 'EAAS2N4DQMIEBADQHBUZAhTCgbfXSj3WXzIqlvBZAoKdLfDtbrz4CtD09zrDO6ju8WGzr7kKDaMCbGL6O79jdwGBE6C2vxm2M00QFwCTIV69lZB5NPhdqViEexZBoQSZAsKYYHDn9bLeZCwdmZBOeV5MFZAmb2ZAkC3nUZD', 'EAAS2N4DQMIEBADQHBUZAhTCgbfXSj3WXzIqlvBZAoKdLfDtbr', 'http://graph.facebook.com/1815104608743453/picture?type=large', '2016-11-25 10:59:59', '2016-11-26 08:11:38', 'Thanhtu Pham', 1, '1'),
(20, 'test@gmail.com', '0983758939', '$2a$10$9FAX3urCoxKQebsT7o6nG.cIfWaM7gshhaXbNhayvlaP.aG60iK6e', 'local', '', 'test@gmail.com', '', '2016-12-13 08:26:40', '2016-12-13 08:26:41', 'Phạm Thanh Tú', 0, '1');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `refresh_token` (`refresh_token`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
 ADD PRIMARY KEY (`id`), ADD KEY `index_items_on_post_id` (`post_id`), ADD KEY `index_items_on_target_type_and_target_id` (`target_type`,`target_id`), ADD KEY `index_items_on_post_id_and_sort_rank` (`post_id`,`sort_rank`);

--
-- Indexes for table `item_images`
--
ALTER TABLE `item_images`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_texts`
--
ALTER TABLE `item_texts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `item_twitters`
--
ALTER TABLE `item_twitters`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `news_posts`
--
ALTER TABLE `news_posts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
 ADD PRIMARY KEY (`id`), ADD KEY `index_posts_on_accepted_and_published_at` (`accepted`,`published_at`), ADD KEY `index_posts_on_updated_at` (`updated_at`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
 ADD PRIMARY KEY (`id`), ADD KEY `index_projects_on_updated_at` (`updated_at`);

--
-- Indexes for table `schema_migrations`
--
ALTER TABLE `schema_migrations`
 ADD UNIQUE KEY `unique_schema_migrations` (`version`);

--
-- Indexes for table `sell_posts`
--
ALTER TABLE `sell_posts`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service_points`
--
ALTER TABLE `service_points`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `social_accounts`
--
ALTER TABLE `social_accounts`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `index_social_accounts_on_account_type_and_author_id` (`account_type`,`author_id`);

--
-- Indexes for table `taggings`
--
ALTER TABLE `taggings`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `index_taggings_on_tag_id_and_subject_id_and_subject_type` (`tag_id`,`subject_id`,`subject_type`), ADD KEY `index_taggings_on_subject_type_and_subject_id` (`subject_type`,`subject_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `login_token` (`login_token`), ADD UNIQUE KEY `username` (`username`), ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=301;
--
-- AUTO_INCREMENT for table `item_images`
--
ALTER TABLE `item_images`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=102;
--
-- AUTO_INCREMENT for table `item_texts`
--
ALTER TABLE `item_texts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=127;
--
-- AUTO_INCREMENT for table `item_twitters`
--
ALTER TABLE `item_twitters`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=77;
--
-- AUTO_INCREMENT for table `news_posts`
--
ALTER TABLE `news_posts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `sell_posts`
--
ALTER TABLE `sell_posts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `service_points`
--
ALTER TABLE `service_points`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `social_accounts`
--
ALTER TABLE `social_accounts`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `taggings`
--
ALTER TABLE `taggings`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=129;
--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
