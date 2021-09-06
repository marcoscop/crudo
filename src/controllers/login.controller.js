const loginController = {};
const passport = require('passport');
loginController.renderLogin = (req, res) => {
    res.render('login/login');
};

/*loginController.loginIn = (req, res) => {
    res.send(req.body);
}*/

// funcion que realiza el sigin del usuario
loginController.loginIn = passport.authenticate('local',{
    failureRedirect:'/login',
    successRedirect:'/',
    failureFlash: true
});
loginController.logOut = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Sesion cerrada.');
    res.redirect('/login');
}

module.exports = loginController;