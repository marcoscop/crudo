const cursoController = {};

const pool = require('../database');

cursoController.renderAllCursos = async(req, res) => {
    let sql = 'SELECT * FROM cursos';
    try {
        const cursos = await pool.query(sql);
        /*const cursos = {
            id:lista
        }*/
        if (Object.keys(cursos).length > 0){
            res.render('cursos/all-cursos2', {
                cursos
            });
        }else{
            const warningMsg = [];
            warningMsg.push({msg:'No existen cursos aun. Debe crearlos'});
            req.flash('warning_msg','No existen cursos aun. Debe crearlos');
            res.render('cursos/all-cursos', {
                warningMsg
            });
        }
    } catch (error) {
        console.log('|-->DB-Error: ', error);
    }    
};

cursoController.renderNewCurso = async(req, res) => {
    try {
        let sql = 'SELECT * FROM cursos';
        const listaCursos = await pool.query(sql);
        res.render('cursos/new-curso.hbs', {
            listaCursos
        });
    } catch (error) {
        
    }
};
cursoController.addCurso = async (req, res) => {
    //res.send(req.body);
    const nombre = req.body.nombre_curso
    const turno = req.body.turno_curso;
    const curso = {nombre:nombre, turno:turno};
    try {
        let sql = 'INSERT INTO cursos SET ?';
        await pool.query(sql, [curso]);
        req.flash('success_msg', 'Se ha creado un nuevo curso');
        res.redirect('/cursos/renderCursos');
    } catch (error) {
        
    }
};
cursoController.renderEditCurso = async(req, res) => {
    let sql = "SELECT * FROM cursos WHERE cursos.id = ?";
    //console.log("idCurso: " + req.params.idCurso);
    try {
        const curso = await pool.query(sql, [req.params.idCurso]);
        /*const curso = {
            id: cursoRow.id,
            nombre: cursoRow.nombre,
            turno: cursoRow.turno
        };*/
        //console.log("CURSO: " + curso[0].nombre);
        res.render('cursos/edit-curso', {
            curso
        })
    } catch (error) {
        console.log("|-->DB-Error: "+ error);
    }
    //res.send(req.params);
}
cursoController.updateCurso = (req, res) => {
    console.log("idCurso: " + req.params.idCurso);
    res.send('renderizar para editar');
};

cursoController.deleteCurso = (req, res) => {
    res.send('eliminar un curso');
}

module.exports = cursoController;