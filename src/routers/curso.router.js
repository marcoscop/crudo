const {Router} = require('express');

const router = Router();

const {isAuthenticated} = require('../helpers/auth');

const {
    deleteCurso,
    renderAllCursos,
    renderNewCurso,
    addCurso,
    renderEditCurso,
    updateCurso
    
} = require('../controllers/curso.controller');

router.get('/cursos/renderCursos', isAuthenticated, renderAllCursos);

router.get('/cursos/renderNewCurso', isAuthenticated, renderNewCurso);

router.post('/cursos/new-curso',  isAuthenticated ,addCurso);

router.put('/cursos/update/:idCurso', isAuthenticated, updateCurso);

router.get('/cursos/edit/:idCurso', isAuthenticated, renderEditCurso);



module.exports = router;