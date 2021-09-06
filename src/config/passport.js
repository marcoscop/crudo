const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcryptjs');

const pool = require('../database');

//const User = require('../models/User');

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'password'
}, async (name, password, done) => {
    let sql = 'SELECT * FROM admins WHERE nombre = ?'
    const user = await pool.query(sql, [name]);        
    console.log('Encontro: ' + Object.keys(user).length);
    if (Object.keys(user).length > 0) {        
        console.log('Password: ' + user[0].password);        
        const match = await bcrypt.compare(password, user[0].password);
        console.log('USER: ' + JSON.stringify(user));
        if (match) {
            console.log('USER: ' + Object.values(user));
            return done(null, user);
        }else{
            return done(null, false, {message: 'Password Incorrecto'});
        }        
    }else{
        return done(null, false, {message: 'Usuario incorrecto'});
    }
}));

passport.serializeUser((user, done) => {
    console.log('admins= ' + user[0].nombre);
    done(null, user[0].id);
});

passport.deserializeUser(async (id, done) => {
    //User.findById(id, (err, user) => {
    let sql = 'SELECT * FROM admins WHERE admins.id = ?';
    await pool.query(sql, [id], (err, user) => {
        const nombre = user[0].nombre;    
    //console.log('deserializeUser= ' + id);
        done(err, user, nombre);
    });
});