-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Nov 04, 2015 at 12:37 AM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `foodtruck`
--

-- --------------------------------------------------------

--
-- Table structure for table `truck`
--

CREATE TABLE `truck` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `food_type` varchar(50) NOT NULL,
  `logo` varchar(50) DEFAULT NULL,
  `website` varchar(100) DEFAULT NULL,
  `facebook` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `yelp` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=65 ;

--
-- Dumping data for table `truck`
--

INSERT INTO `truck` (`id`, `name`, `food_type`, `logo`, `website`, `facebook`, `twitter`, `instagram`, `yelp`) VALUES
(1, 'Baja Taco Truck', '', 'logo_bajatacotruck.png', NULL, NULL, NULL, NULL, NULL),
(2, 'Batch Ice Cream', '', 'logo_batchicecream.png', NULL, NULL, NULL, NULL, NULL),
(3, 'BigDaddy Hotdogs', '', 'logo_bigdaddyhotdogs.jpg', NULL, NULL, NULL, NULL, NULL),
(4, 'Blazing Salads', '', NULL, NULL, NULL, NULL, NULL, NULL),
(5, 'Bon Me', '', 'logo_bonme.png', NULL, NULL, NULL, NULL, NULL),
(6, 'Boston Burger Company', '', 'logo_bostonburgercompany.jpeg', NULL, NULL, NULL, NULL, NULL),
(7, 'Boston Projuice', '', 'logo_bostonprojuice.jpeg', NULL, NULL, NULL, NULL, NULL),
(8, 'Boston''s Baddest Burger & Sandwich Co.', '', 'logo_bostonsbaddestburger.png', NULL, NULL, NULL, NULL, NULL),
(9, 'Cameo Macaron', '', 'logo_cameomacaron.jpeg', NULL, NULL, NULL, NULL, NULL),
(10, 'Capriotti''s', '', NULL, NULL, NULL, NULL, NULL, NULL),
(11, 'Captain Marden''s Cod Squad', '', 'logo_captainmardensseafoods.png', NULL, NULL, NULL, NULL, NULL),
(12, 'Chicken & Rice Guys', '', 'logo_chicken_riceguys.png', NULL, NULL, NULL, NULL, NULL),
(13, 'Chili Mango & Lime', '', 'logo_chilimango_lime.png', NULL, NULL, NULL, NULL, NULL),
(14, 'Chubby Chickpea', '', 'logo_chubbychickpea.png', NULL, NULL, NULL, NULL, NULL),
(15, 'CloverDWY', '', 'logo_clover.png', NULL, NULL, NULL, NULL, NULL),
(16, 'Compliments', '', 'logo_compliments.png', NULL, NULL, NULL, NULL, NULL),
(17, 'Cookie Monstah', '', 'logo_cookiemonstah2.png', NULL, NULL, NULL, NULL, NULL),
(18, 'Daddy''s Bonetown Burgers', '', 'logo_daddysbonetownburgers.jpg', NULL, NULL, NULL, NULL, NULL),
(19, 'Dragon Roll', '', NULL, NULL, NULL, NULL, NULL, NULL),
(20, 'Food Lakay', '', 'logo_foodlakay.jpg', NULL, NULL, NULL, NULL, NULL),
(21, 'Fresh Food Generation', '', 'logo_freshfoodgeneration.jpg', NULL, NULL, NULL, NULL, NULL),
(22, 'Frozen Hoagies', '', 'logo_frozenhoagies.jpg', NULL, NULL, NULL, NULL, NULL),
(23, 'Heritage Truck Company', '', 'logo_heritagetruck.png', NULL, NULL, NULL, NULL, NULL),
(24, 'KimKim BBQ', '', 'logo_kimkimbbq.jpeg', NULL, NULL, NULL, NULL, NULL),
(25, 'Lilo''s Plates', '', 'logo_lilosplates.png', NULL, NULL, NULL, NULL, NULL),
(26, 'M&M Ribs', '', NULL, NULL, NULL, NULL, NULL, NULL),
(27, 'Makin'' Jamaican', '', 'logo_makinjamaican.jpg.gif', NULL, NULL, NULL, NULL, NULL),
(28, 'Mediterranean Home Cooking', '', NULL, NULL, NULL, NULL, NULL, NULL),
(29, 'Mei Mei Street Kitchen', '', 'logo_meimei.png', NULL, NULL, NULL, NULL, NULL),
(30, 'Meng''s Kitchen', '', NULL, NULL, NULL, NULL, NULL, NULL),
(31, 'Momogoose2', '', NULL, NULL, NULL, NULL, NULL, NULL),
(32, 'Moyzilla', '', 'logo_moyzilla.00_png_srb.png', NULL, NULL, NULL, NULL, NULL),
(33, 'Munch Mobile', '', 'logo_munchmobile.png', NULL, NULL, NULL, NULL, NULL),
(34, 'Northeast of the Border', '', 'logo_northeastoftheborder.jpeg', NULL, NULL, NULL, NULL, NULL),
(35, 'Papi''s Stuffed Sopapillias', '', 'logo_papisstuffedsopapillas.png', NULL, NULL, NULL, NULL, NULL),
(36, 'Pennypackers', '', 'logo_pennypackers.png', NULL, NULL, NULL, NULL, NULL),
(37, 'Posto Mobile', '', 'logo_postomobile.png', NULL, NULL, NULL, NULL, NULL),
(38, 'Rami''s', '', 'logo_ramis.png', NULL, NULL, NULL, NULL, NULL),
(39, 'Redbones Barbeque', '', 'logo_redbonesbbq.jpg.png', NULL, NULL, NULL, NULL, NULL),
(40, 'Riceburg', '', 'logo_riceburg.jpg', NULL, NULL, NULL, NULL, NULL),
(41, 'Sabroso Taqueria', '', 'logo_sabrosotaqueria.png', NULL, NULL, NULL, NULL, NULL),
(42, 'Saigon Alley', '', 'logo_saigonalley.jpeg', NULL, NULL, NULL, NULL, NULL),
(43, 'Savory Food Truck', '', NULL, NULL, NULL, NULL, NULL, NULL),
(44, 'Sheherazad', '', 'logo_sheherazad.png', NULL, NULL, NULL, NULL, NULL),
(45, 'Slide By Food Truck', '', NULL, NULL, NULL, NULL, NULL, NULL),
(46, 'Stoked Wood Fired Pizza Co.', '', 'logo_stokedwoodfiredpizza.png', NULL, NULL, NULL, NULL, NULL),
(47, 'Stuffed Sandwiches', '', 'logo_stuffedsandwiches.png', NULL, NULL, NULL, NULL, NULL),
(48, 'Sweet Bubble', '', NULL, NULL, NULL, NULL, NULL, NULL),
(49, 'Sweet Tomatoes Pizza', '', 'logo_sweettomatoespizza.gif', NULL, NULL, NULL, NULL, NULL),
(50, 'Taco Party', '', 'logo_tacoparty.png', NULL, NULL, NULL, NULL, NULL),
(51, 'Tasty Burger', '', 'logo_tastyburger.jpg', NULL, NULL, NULL, NULL, NULL),
(52, 'Tea Station', '', NULL, NULL, NULL, NULL, NULL, NULL),
(53, 'Tenoch Mexican', '', 'logo_tenochmexican.png', NULL, NULL, NULL, NULL, NULL),
(54, 'Teri-Yummy', '', 'logo_teriyummy.00_png_srz.png', NULL, NULL, NULL, NULL, NULL),
(55, 'The Bacon Truck', '', 'logo_thebacontruck.png', NULL, NULL, NULL, NULL, NULL),
(56, 'The Dining Car', '', 'logo_thediningcar.jpg', NULL, NULL, NULL, NULL, NULL),
(57, 'The Roving Lunchbox', '', 'logo_therovinglunchbox.jpg', NULL, NULL, NULL, NULL, NULL),
(58, 'Trolley Dogs', '', NULL, NULL, NULL, NULL, NULL, NULL),
(59, 'Uyghur Kitchen', '', NULL, NULL, NULL, NULL, NULL, NULL),
(60, 'Walloon''s', '', 'logo_walloonsfriedchicken.jpg', NULL, NULL, NULL, NULL, NULL),
(61, 'Wow Barbeque', '', 'logo_wowbarbecue.jpg', NULL, NULL, NULL, NULL, NULL),
(62, 'Zinneken''s Waffles', '', 'logo_zinnekenswaffles.jpg', NULL, NULL, NULL, NULL, NULL),
(63, 'Zo on the Go', '', 'logo_zoonthego.png', NULL, NULL, NULL, NULL, NULL),
(64, 'Roxy''s Gourmet Grilled Cheese 1', '', 'logo_roxysgrilledcheese.png', NULL, NULL, NULL, NULL, NULL);
