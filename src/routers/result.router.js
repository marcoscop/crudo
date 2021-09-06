const {Router} = require('express');

const router = Router();

const {isAuthenticated} = require('../helpers/auth');

const {
    renderResult
} = require('../controllers/result.controller');

function mostrar(req, res, next) {
    console.log('MOSTRAME ESTO ACA');
    next();
}

router.get('/result/render', isAuthenticated, mostrar, renderResult);

module.exports = router;