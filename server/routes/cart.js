const express = require('express');
const cartRouter = express.Router();
const pool = require('../db/db');
const { isLoggedIn } = require('./auth');

cartRouter.post('/change', (req, res) => {
    const values = [
        req.body.order_id,
        req.body.product_id,
        req.body.quantity,
        parseInt(String(req.body.order_id) + String(req.body.product_id))
    ];
    pool.query('INSERT INTO order_products (id, order_id, product_id, quantity, product_order) VALUES (DEFAULT, $1, $2, $3, $4) ON CONFLICT (product_order) DO UPDATE SET quantity = EXCLUDED.quantity',
    values, (q_err, q_res) => {
        if(q_err) return console.log(q_err);
        res.json(q_res.rows);
    });
});

cartRouter.get('/quantity/:order_id/:product_id', (req, res) => {
    const values = [
        req.params.order_id,
        req.params.product_id
    ];
    pool.query('SELECT quantity FROM order_products WHERE order_id = $1 AND product_id = $2',
    values, (q_err, q_res) => {
        if(q_err) throw q_err;
        res.json(q_res.rows);
    });
});

cartRouter.get('/total/:order_id', (req, res) => {
    pool.query('SELECT SUM(quantity) FROM order_products WHERE order_id = $1',
    [ req.params.order_id ], (q_err, q_res) => {
        if(q_err) throw q_err;
        res.json(q_res.rows);
    });
});

cartRouter.get('/products/:order_id', (req, res) => {
    pool.query('SELECT product_id, quantity FROM order_products WHERE quantity != 0 AND order_id = $1 ',
    [ req.params.order_id ], (q_err, q_res) => {
        if(q_err) res.send('no order id');
        if(q_res) res.json(q_res.rows);
    });
});

module.exports = cartRouter