-- create table products --

CREATE TABLE products (
    id INT NOT NULL,
    name STRING,
    price MONEY,
    PRIMARY KEY (id)
)



-- Crud create data --

INSERT INTO products
VALUES (1, "pen", 1.20);

INSERT INTO products (id, name)
VALUES (2, "pencil");

-- cRud read data --

SELECT * FROM products;

SELECT name, price FROM products;

SELECT * FROM products WHERE id=1;

-- crUd update data --

UPDATE products
SET price = 0.80
WHERE id=1;

-- alter table products --
ALTER TABLE products 
ADD stock INT;

UPDATE products
SET stock=32, price=1.20
WHERE id=1;

UPDATE products
SET stock=12, price=0.80
WHERE id=2;

-- cruD destroy product --
DELETE FROM products
WHERE id=2;

--

CREATE TABLE customers (
	id INT NOT NULL,
    first_name STRING,
    last_name STRING,
    address STRING,
    PRIMARY key (id)
)

CREATE TABLE orders (
	id INT NOT NULL,
    order_number INT,
    customer_id INT,
  	product_id INT,
    PRIMARY key (id),
  	FOREIGN KEY (customer_id) REFERENCES customers(id),
  	FOREIGN KEY (product_id) references products(id)
)

insert into customers
values (1, "Harry", "Porter", "Somewhere else"); 

insert into customers
values (2, "Pipi", "Pupu", "Let it go"); 

insert into orders
VALUES (1, 4362, 2, 1);

insert into orders
VALUES (2, 3254, 1, 1);

-- inner join --
SELECT orders.id, orders.order_number, customers.first_name, customers.last_name, customers.address, products.name, products.price, products.stock
FROM ((orders
INNER JOIN customers ON orders.customer_id = customers.id)
INNER JOIN products ON orders.product_id = products.id); 