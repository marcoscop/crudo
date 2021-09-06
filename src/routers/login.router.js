const {Router} = require('express');

const router = Router();

//const {isAuthenticated} = require('../helpers/auth');

const {
    renderLogin,
    loginIn,
    logOut
} = require('../controllers/login.controller');

router.get('/login', renderLogin);

router.post('/login/signin', loginIn);

router.get('/logout', logOut);

module.exports = router;