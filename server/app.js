const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const { authRouter } = require('./routes/auth');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders');
const cartRouter = require('./routes/cart');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.json());

app.use(cookieSession({
    name: 'ecommerce-session',
    keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
}
// app.use(express.static(path.join(__dirname, "../client/build")));

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/cart', cartRouter);

console.log(process.env.DATABASE_URL);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});