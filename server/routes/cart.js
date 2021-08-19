const express = require('express');
const cartRouter = express.Router();
const pool = require('../db/db');
const { isLoggedIn } = require('./auth');

cartRouter.post('/additem', isLoggedIn, (req, res) => {
    const values = [
        req.body.order_id,
        req.body.product_id,
        req.body.quantity
    ];
    pool.query('INSERT INTO order_products (id, order_id, product_id, quantity) VALUES (DEFAULT, $1, $2, $3) ON CONFLICT (product_id) DO UPDATE SET quantity = quantity + 1',
    values, (q_err, q_res) => {
        if(q_err) return console.log(q_err);
        res.json(q_res.rows);
    });
});

// cartRouter.get('/', isLoggedIn, (req, res) => {
//    pool.query('SELECT * FROM order_products', (q_err, q_res) => {
//        res.json(q_res.rows);
//    });
// });

// cartRouter.get('/:id', isLoggedIn, (req, res) => {
//     pool.query('SELECT * FROM orders WHERE id = $1',
//     [req.params.id], (q_err, q_res) => {
//         res.json(q_res.rows);
//     });
//  });

// cartRouter.put('/:id', isLoggedIn, (req, res) => {
//     const values = [
//         req.params.id,
//         req.body.order_id,
//         req.body.product_id,
//         req.body.quantity
//     ];
//     pool.query('UPDATE orders SET shipping_address = $2, total_price = $3 WHERE id = $1',
//     values, (q_err, q_res) => {
//         console.log(q_res);
//         console.log(q_err);
//     });
// });

// cartRouter.delete('/:id', isLoggedIn, (req, res) => {
//     pool.query('DELETE FROM orders WHERE id = $1',
//     [req.params.id], (q_err, q_res) => {
//         res.json(q_res.rows);
//         console.log(q_err);
//     });
// });

module.exports = cartRouter