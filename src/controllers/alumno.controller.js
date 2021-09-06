const pool = require("../database");

const alumnoController = {};

alumnoController.renderAllAlumnos = async(req, res) => {
    const idCurso = req.params.idCurso;
    console.log("Curso seleccionado: " + idCurso);
    let sql = 'SELECT * FROM alumnos WHERE alumnos.id_curso = ?';
    const listaAlumnos = await pool.query(sql, [idCurso]);
    sql = "SELECT * FROM cursos WHERE cursos.id = ?";
    let curso = await pool.query(sql, [idCurso]);    
    const nombreCurso = curso[0].nombre;
    curso = await pool.query('SELECT * FROM cursos');    
    //console.log(nombreCurso);
    //console.log("Lista de alumnos: "+ listaAlumnos);
    res.render('alumnos/all-alumnos', {
        listaAlumnos,
        idCurso,
        curso,
        nombreCurso
    });
};
alumnoController.renderAddAlumno = (req, res) => {
    const idCurso = req.params.idCurso;
    res.render('alumnos/add-alumno',{
        idCurso
    });
};
alumnoController.addAlumno = async(req, res) => {
    const idCurso = req.params.idCurso;
    const {apellido, nombre, dni} = req.body;
    const alumno = {
        apellido:apellido,
        nombre:nombre,
        dni:dni,
        id_curso:idCurso
    }
    try {
        let sql = 'INSERT INTO alumnos SET  ?';
        await pool.query(sql, [alumno]);
        req.flash('success_msg', 'Se ha agregado un alumno al curso');
        res.redirect('/curso/alumnos/'+idCurso);
    } catch (error) {
        req.flash('errors_msg','Se ha producido un Error al realizar una operacion en la Base de Datos');
        res.redirect('/');
    }
}
alumnoController.renderEditAlumno = async(req, res) =>{
    const idAlumno = req.params.idAlumno;
    let sql = 'SELECT * FROM alumnos WHERE alumnos.id = ?';
    try {
        const alumno = await pool.query(sql, [idAlumno]);
        let idCurso = alumno[0].id_curso;
        console.log(alumno);
        res.render('alumnos/edit-alumno', {
            alumno,
            idCurso
        })
    } catch (error) {
        
    }
};
alumnoController.updateAlumno = async(req, res) => {
    const idAlumno = req.params.idAlumno;
    const idCurso = req.params.idCurso;
    const alumno = {
        apellido:req.body.apellido,
        nombre:req.body.nombre, 
        dni:req.body.dni
    }
    try {
        let sql = 'UPDATE alumnos SET ? WHERE alumnos.id = ?';
        await pool.query(sql, [alumno, idAlumno]);
        req.flash('success_msg', 'Se han actualizado los datos del alumno');

        res.redirect('/curso/alumnos/'+idCurso);
    } catch (error) {
        req.flash('errors_msg', 'Se ha producido un error: '+error);
        res.redirect('/');
    }
};
alumnoController.deleteAlumno = async(req, res) => {
    const idAlumno = req.params.idAlumno;
    const idCurso = req.params.idCurso;
    try {
        let sql = 'DELETE FROM alumnos WHERE alumnos.id = ?';
        await pool.query(sql, idAlumno);
        req.flash('success_msg', 'Se ha eliminado al alumno');
        res.redirect('/curso/alumnos/'+idCurso);
    } catch (error) {
        req.flash('errors_msg', 'Se ha producido un error: '+ error);
        res.redirect('/');
    } 
};
alumnoController.actualizarCurso = async(req, res) => {
    const idCurso = req.params.idCurso;
    const idAlumno = req.params.idAlumno;
    const idCursoSelected = req.params.idCursoSelected;
    try {
        let sql = 'UPDATE alumnos SET alumnos.id_curso = ? WHERE alumnos.id = ?';
        await pool.query(sql, [idCurso, idAlumno]);
        res.redirect('/curso/alumnos/'+idCursoSelected);
    } catch (error) {
        req.flash('errors_msg', 'Se ha producido un error: '+ error);
        res.redirect('/');
    }
}
module.exports = alumnoController;