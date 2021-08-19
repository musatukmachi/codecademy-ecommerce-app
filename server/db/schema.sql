CREATE TABLE users (
  id DECIMAL UNIQUE,
  name VARCHAR(50),
  username VARCHAR(50)
);

CREATE TABLE products (
	id SERIAL PRIMARY KEY,
  url TEXT,
  name VARCHAR(50),
  description TEXT,
  price FLOAT
);

CREATE TABLE orders (
	id SERIAL PRIMARY KEY,
  user_id DECIMAL REFERENCES users(id),
  shipping_address VARCHAR(50),
  total_price FLOAT,
  created DATE,
  ship_by DATE
);

CREATE TABLE order_products (
	id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id) UNIQUE,
  quantity INTEGER
);