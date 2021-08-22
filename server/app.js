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
const pool = require('./db/db');

const app = express();

const PORT = process.env.PORT || 4000;

// var firstRun = true;
// const tempUserTime = Date.now();

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

// app.use((req, res, next) => {
//     res.locals.tempUserId = tempUserTime;
//     if(firstRun === true){
//         pool.query('INSERT INTO users VALUES ($1)', [ tempUserTime ]);
//         firstRun = false;
//     }
//     next();
// });

app.use('/api/products', productsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/cart', cartRouter);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});