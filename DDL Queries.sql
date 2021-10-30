CREATE TABLE `Play_store` (
  `App` varchar(255) NOT NULL,
  `Category` varchar(45) NOT NULL,
  `Rating` decimal(2,1) NOT NULL,
  `Reviews` int NOT NULL,
  `Size` varchar(10) NOT NULL,
  `Installs` int NOT NULL,
  `Type` varchar(5) NOT NULL,
  `Price` decimal(6,2) NOT NULL,
  `Content_Rating` int NOT NULL,
  `Genres` varchar(45) NOT NULL,
  `Last_Updated` varchar(15) NOT NULL,
  `Current_Var` varchar(60) NOT NULL,
  `Android_Var` varchar(20) NOT NULL,
  `App_id` int NOT NULL,
  PRIMARY KEY (`App`)
);

CREATE TABLE `User_review` (
  `App` varchar(255) DEFAULT NULL,
  `Translated_Review` varchar(3000) DEFAULT NULL,
  `Sentiment` varchar(10) DEFAULT NULL,
  `Sentiment_Polarity` decimal(4,3) DEFAULT NULL,
  `Sentiment_Subjectivity` decimal(4,3) DEFAULT NULL,
  `Review_id` int NOT NULL,
  PRIMARY KEY (`Review_id`),
  KEY `App_idx` (`App`),
  CONSTRAINT `App` FOREIGN KEY (`App`) REFERENCES `Play_store` (`App`)
);

CREATE TABLE `App_pics` (
  `url` varchar(200) NOT NULL,
  `Category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`url`)
);