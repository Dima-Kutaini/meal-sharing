CREATE DATABASE  IF NOT EXISTS `meal-sharing`;
USE `meal-sharing`;
--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
CREATE TABLE Meal(
 id int(10) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,  
 title varchar(255) NOt NULL,
 description TEXT  NOT NULL,
 location varchar(255) NOT NULL,
 `when` DATETIME NOT NULL, 
 max_reservations int(50) NOT NULL,
 price DECIMAL (10,2) NOT NULL,
 created_date DATETIME NOT NULL
  ); 

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(1, 'pasta', 'Pasta with a sauce.', 'Italy', '2017-10-25 06:54:16', 30, 9.99, '2017-10-25 06:54:16');
insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(2, 'Burger', 'delicious burger', 'NEW York', '2023-10-01 16:00:00', 40, 11.99, '2023-10-25 16:54:16');
insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(3, 'Pizza', 'the best pizza', 'italy', '2023-02-01 17:00:00', 50, 15.99, '2023-10-25 16:00:00');

INSERT INTO meals (id, title, description, location, `when`, max_reservations, price, created_date) 
VALUES (4, 'Lemon Chicken', 'jusy, tender chickenbearsrs are ad delicious as they are healthy', 'Healthy food', '2023-03-01 17:30:00', 50, 15.99, '2023-10-25 16:00:00');
insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(5, 'Taco soup', 'tacos but soup', 'italy food', '2023-05-01 17:00:00', 50, 15.99, '2023-10-25 15:00:00');
 insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(6, 'coconut curry ramen', 'healthy veggies', ' spring street', '2023-04-01 17:00:00', 70, 15.99, '2023-10-25 18:00:00');
 insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(7, 'shrimp scampi', 'buttery, garlicky, shrimp-y and pasta-y', 'Best food street', '2023-03-03 17:00:00', 110, 15.99, '2023-10-25 16:00:00');
 insert into meals (id, title, description, location, `when`, max_reservations, price, created_date) 
 values(8, 'organe chicken, 'a health apin on the sweet-savory favorite', 'healthy food', '2023-04-04 17:00:00', 150, 15.99, '2023-10-25 17:00:00');

/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;
