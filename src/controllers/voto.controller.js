const pool = require('../database');

const votoController = {};

votoController.renderLoginVoto = (req, res) => {
    res.render('votar/loginVoto');
};

votoController.renderVotacion = async (req, res) => {
    //res.send(req.body);
    const dni = req.body.dni;
    //console.log("dni: "+ dni);    
    let sql = 'SELECT * FROM alumnos WHERE dni = ?';
    const alumno = await pool.query(sql, [dni]);
    //console.log("alumno: "+ alumno);
    if (Object.keys(alumno).length > 0) {
        sql = "SELECT alumnos.id, alumnos.dni " +
            "FROM alumnos INNER JOIN votaron ON alumnos.id = votaron.id_alumno WHERE alumnos.dni = ?";
        const yaVoto = await pool.query(sql, [dni]);
        if (Object.keys(yaVoto).length > 0) {    //--> YA VOTO
            req.flash('errors_msg', 'El DNI ingresado ya participo de la Votacion. SI Usted considera que esto es un error, contacte al Admin');
            res.redirect('/voto');
        } else {
            sql = "SELECT * FROM listas";
            const listas = await pool.query(sql);
            res.render('votar/listas', {
                listas,
                dni
            });
        }
    } else {
        req.flash('errors_msg', 'DNI no autorizado a votar.');
        res.redirect("/voto");
    }
};

votoController.votar = async (req, res) => {
    const idLista = req.body.idListaSeleccionada;
    const dni = req.body.dni;
    console.log('dni:- ' + dni);
    let fecha = new Date();
    console.log('fecha: ---> ' + fecha);
    const voto = {
        id_lista: idLista,
        fecha: fecha
    }
    let sql = 'INSERT INTO votos SET ?';
    try {
        await pool.query(sql, [voto]);
        sql = 'SELECT alumnos.id FROM alumnos WHERE alumnos.dni = ?';
        const alumno = await pool.query(sql, [dni]);
        console.log('DNI:__ ' + alumno[0].dni);
        const votante = {
            id_alumno: alumno[0].id,
            fecha: fecha
        }
        await pool.query('INSERT INTO votaron SET ?', [votante]);
        req.flash('success_msg', 'Su voto ha sido registrado.');
        res.status(200).json('OK');
        //res.redirect('/voto');<
    } catch (error) {
        console.log('DB-Error: ' + error);
        req.flash('errors_msg', error);
        res.status(500).json('ERROR');
        //res.redirect("/")
    }
}
module.exports = votoController;