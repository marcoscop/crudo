const {Router} = require('express');

const router = Router();

const {
    renderLoginVoto,
    renderVotacion,
    votar
} = require('../controllers/voto.controller');
//const { get } = require('./alumno.router');

router.get('/voto', renderLoginVoto);

router.post('/voto/signin', renderVotacion);

//router.get('/voto/votar/:idLista/:dni', votar);
router.post('/voto/votar', votar);

module.exports = router;