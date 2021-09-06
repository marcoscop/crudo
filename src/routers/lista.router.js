const {Router} = require('express');

const router = Router();

const {isAuthenticated} = require('../helpers/auth');

const {
    renderListas,
    renderAddLista,
    saveLista
} = require('../controllers/lista.controller');

router.get('/listas/render',isAuthenticated, renderListas);

router.get('/listas/add',isAuthenticated, renderAddLista);

router.post('/listas/addLista', isAuthenticated, saveLista);

module.exports = router;