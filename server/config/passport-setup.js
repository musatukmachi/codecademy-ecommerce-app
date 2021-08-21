const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const pool = require('../db/db');
// const keys = require('./keys');

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    pool.query('SELECT * FROM users WHERE id = $1',
    [ id ], (q_err, q_res) => {
        const user = {
            id: q_res.rows[0].id,
            name: q_res.rows[0].name
        };
        done(q_err, user);
    });
});

// Use the GoogleStrategy within Passport.
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,// || keys.googleID,
    clientSecret: process.env.GOOGLE_SECRET,// || keys.googleSecret,
    callbackURL: "/api/auth/google/callback",
    proxy: true
  },
  function(accessToken, refreshToken, profile, done) {
    const values = [
        profile.id,
        profile.displayName,
    ];
    pool.query('INSERT INTO users (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name RETURNING id, name',
    values, (q_err, q_res) => {
        if(q_err) {
            console.log(q_err);
        }
        const user = {
            id: q_res.rows[0].id,
            name: q_res.rows[0].name
        };
        return done(q_err, user);
    });  
  }
));