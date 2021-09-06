const indexController = {};

indexController.renderIndex = (req, res) => {
    res.render('votar/loginVoto');
};

/*indexController.renderAbout = (req, res) => {
    res.render('about');
};*/

module.exports = indexController;