const {Router} = require('express');

const router = Router();

const {isAuthenticated} = require('../helpers/auth');

const {
    renderAllAlumnos,
    renderAddAlumno,
    addAlumno,
    renderEditAlumno,
    updateAlumno,
    deleteAlumno,
    actualizarCurso
} = require('../controllers/alumno.controller');

router.get('/curso/alumnos/:idCurso', isAuthenticated, renderAllAlumnos);

router.get('/curso/addAlumnos/:idCurso', renderAddAlumno);

router.post('/curso/saveAlumno/:idCurso', addAlumno);

router.get('/curso/editAlumno/:idAlumno', renderEditAlumno);

router.put('/curso/updateAlumno/:idAlumno/:idCurso',  updateAlumno);

router.delete('/curso/deleteAlumno/:idAlumno/:idCurso', deleteAlumno);

router.get('/curso/actualizarCurso/:idAlumno/:idCurso/:idCursoSelected', actualizarCurso);

module.exports = router;