const express = require('express');
const productsRouter = express.Router();
const pool = require('../db/db');

productsRouter.post('/', (req, res) => {
    const values = [
        req.body.name,
        req.body.description,
        req.body.price
    ];
    pool.query(
        'INSERT INTO products VALUES (DEFAULT, $1, $2, $3) RETURNING id',
    values, (q_err, q_res) => {
        if(q_err) { 
            console.log(q_err);
            return;
        }
        console.log(q_res.rows);
        res.json(q_res.rows);
    });
});

productsRouter.get('/', (req, res) => {
   pool.query('SELECT * FROM products', (q_err, q_res) => {
       if(q_err) {
           res.status(404).send('no products');
       }
       res.json(q_res.rows);
   });
});

productsRouter.get('/:id', (req, res) => {
    pool.query('SELECT * FROM products WHERE id = $1',
    [req.params.id], (q_err, q_res) => {
        res.json(q_res.rows);
    });
 });

productsRouter.put('/:id', (req, res) => {
    const values = [
        req.params.id,
        req.body.name,
        req.body.description,
        req.body.price
    ];
    pool.query('UPDATE products SET name = $2, description = $3, price = $4 WHERE id = $1',
    values, (q_err, q_res) => {
        console.log(q_res);
        console.log(q_err);
    });
});

productsRouter.delete('/:id', (req, res) => {
    pool.query('DELETE FROM products WHERE id = $1',
    [req.params.id], (q_err, q_res) => {
        res.json(q_res.rows);
        console.log(q_err);
    });
});

module.exports = productsRouter