const express = require('express');
const authRouter = express.Router();
const pool = require('../db/db');
require('../config/passport-setup');
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
    if(req.user){
        next();
    } else {
        res.redirect('/');
    }
}

authRouter.get('/check', (req, res) => res.send( { result: req.user ? true : false } ));

authRouter.get('/user', (req, res) => res.send( { result: req.user ? req.user.id : res.locals.tempUserId } ));

authRouter.post('/tempuser', (req, res) => {
    pool.query('INSERT INTO users VALUES ($1)', [ req.body.id ]);
    res.send('ok');
});

authRouter.get('/google',
    passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

authRouter.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    }
);

authRouter.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = { authRouter, isLoggedIn }