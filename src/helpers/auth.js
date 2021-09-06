const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    console.log(req.isAuthenticated); 
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'No tiene suficientes privilegios para visualizar esta seccion');
    res.redirect('/');
}

module.exports = helpers