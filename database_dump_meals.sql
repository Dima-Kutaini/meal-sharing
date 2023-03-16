CREATE DATABASE  IF NOT EXISTS `meal-sharing`;
USE `meal-sharing`;
--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
CREATE TABLE `meals` (
  `idmeals` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(45) DEFAULT NULL,
  `number_of_guests` int(11) DEFAULT NULL,
   `date` dateTime,
  PRIMARY KEY (`idmeals`)
) ENGINE=InnoDB AUTO_INCREMENT=6;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meals` VALUES (1,'bla bla bla',3,'2023-03-20 18:30:00'),(2,'bla bla bla',3,'2024-01-20 18:30:00'),(3,'asdasd',7,'2023-11-23 15:00:00'),(4,'benjamins karry',10,'2023-05-20 11:00:00'),(5,'oooooooooo',1,'2024-11-23 14:00:00');
UNLOCK TABLES;
