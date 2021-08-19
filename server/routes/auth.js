const express = require('express');
const authRouter = express.Router();
const pool = require('../db/db');
require('../config/passport-setup');
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.status(401).send('Unauthorised access to page');
    }
}

authRouter.get('/check', (req, res) => req.user ? res.send(true) : res.send(false));

authRouter.get('/user', isLoggedIn, (req, res) => res.send(req.user.id));

authRouter.get('/failed', (req, res) => {
    res.send('Failed Google Login');
});

authRouter.get('/success', isLoggedIn, (req, res) => {
    res.send(`Welcome ${req.user.name}`);
});

authRouter.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

authRouter.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function(req, res) {
        res.redirect('/');
    }
);

authRouter.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

// authRouter.post('/register', (req, res) => {
//     const values = [
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ];
//     pool.query('INSERT INTO users VALUES (DEFAULT, $1, $2, $3)',
//     values, (q_err, q_res) => {
//         if(q_err) return next(q_err);
//         res.json(q_res.rows);
//     });
// });

// authRouter.get('/', (req, res) => {
//    pool.query('SELECT * FROM users', (q_err, q_res) => {
//        res.json(q_res.rows);
//    });
// });

// authRouter.get('/:id', (req, res) => {
//     pool.query('SELECT * FROM users WHERE id = $1',
//     [req.params.id], (q_err, q_res) => {
//         res.json(q_res.rows);
//     });
//  });

// authRouter.put('/:id', (req, res) => {
//     const values = [
//         req.params.id,
//         req.body.name,
//         req.body.email,
//         req.body.password
//     ];
//     pool.query('UPDATE users SET name = $2, email = $3, password = $4 WHERE id = $1',
//     values, (q_err, q_res) => {
//         console.log(q_res);
//         console.log(q_err);
//     });
// });

// authRouter.delete('/:id', (req, res) => {
//     pool.query('DELETE FROM users WHERE id = $1',
//     [req.params.id], (q_err, q_res) => {
//         res.json(q_res.rows);
//         console.log(q_err);
//     });
// });

module.exports = { authRouter, isLoggedIn }