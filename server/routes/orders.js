const express = require('express');
const ordersRouter = express.Router();
const pool = require('../db/db');
const date = require('date-and-time');
const { isLoggedIn } = require('./auth');

// ordersRouter.post('/', isLoggedIn, (req, res) => {
//     const now = new Date();
//     let createdTime = date.format(now, 'YYYY-MM-DD');
//     let shipBy = date.format(date.addDays(now, 3), 'YYYY-MM-DD');
//     const values = [
//         req.body.user_id,
//         req.body.shipping_address,
//         req.body.total_price,
//         createdTime,
//         shipBy
//     ];
//     pool.query('INSERT INTO orders VALUES (DEFAULT, $1, $2, $3, $4, $5)',
//     values, (q_err, q_res) => {
//         if(q_err) return console.log(q_err);
//         res.json(q_res.rows);
//     });
// });

ordersRouter.post('/', (req, res) => {
    pool.query('INSERT INTO orders (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING',
    [ req.user ? req.user.id : req.body.user_id ], (q_err, q_res) => {
        if(q_err) console.log(q_err);
        // console.log(q_res);
    });
});

ordersRouter.get('/getorder/:user_id', (req, res) => {
   pool.query('SELECT id FROM orders WHERE user_id = $1', [ req.user ? req.user.id : req.params.user_id ], (q_err, q_res) => {
       res.json(q_res.rows);
   });
});

module.exports = ordersRouter