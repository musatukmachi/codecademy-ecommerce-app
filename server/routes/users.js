const express = require('express');
const usersRouter = express.Router();
const pool = require('../db/db');
require('../config/passport-setup');
const { isLoggedIn } = require('./auth');

usersRouter.get('/:username', (req, res) => {
    pool.query('SELECT * FROM users WHERE username = $1',
    [req.params.username], (q_err, q_res) => {
        if (q_err) {
            res.status(404).send('Could not find this user');
        }
        res.json(q_res.rows);
    });
});

usersRouter.put('/setusername', isLoggedIn, (req, res) => {
    values = [
        req.user.name,
        req.body.username
    ];
    pool.query('UPDATE users SET username = $2 WHERE name = $1',
    values, (q_err, q_res) => {
        console.log(q_res);
        console.log(q_err);
    });
});


module.exports = usersRouter