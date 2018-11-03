DROP DATABASE IF EXISTS bamazon_db;
-- Create a database called programming_db --
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
   Id INTEGER(11) AUTO_INCREMENT NOT NULL,
  productName VARCHAR(50),
  deptName VARCHAR(50),
  price DECIMAL(10,2) NULL,
  quantity INT(100) NULL,
  primary Key (ID)
);

-- Creates new rows
INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("iphone x",'electronics',300,1000 );

INSERT INTO products  (productName, deptName,price,quantity)
VALUES ("Lenovo laptop",'electronics',350, 900 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("ipad",'electronics',300,800 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("Playstation 4",'electronics',300,1000 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("Holy Bible",'books',70,1500 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("KB jersey",'sports apparel',65,450 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("lens cleaner",'eye care',7,300 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("AAA batteries",'electronics',3.50,200);

INSERT INTO products  (productName, deptName,price,quantity)
VALUES ("macbook pro",'electronics',400,950 );

INSERT INTO products  (productName, deptName,price, quantity)
VALUES ("night stand",'furniture',75,800 )


