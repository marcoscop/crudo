const listaController = {};

const pool = require('../database');

listaController.renderListas = async (req, res) => {

    try {
        let sql = 'SELECT * FROM listas';
        const listas = await pool.query(sql);
        if (Object.keys(listas).length > 0) {
            res.render('listas/all-listas',{
                listas
            });
        }else{
            //req.flash('warning_msg', 'Aun no se han creado listas');
            const warningMsg = [];
            warningMsg.push({msg:'Aun no se han creado listas'});
            res.render('listas/all-listas',
                warningMsg
            );
        }
    } catch (error) {
        console.log('|DB-Error--> ' + error);
        req.flash('errors_msg', 'Se ha producido un error al consultar la Base de Datos');
        res.redirect('/');
    }
};

listaController.renderAddLista = (req, res) => {
    res.render('listas/add-lista');
};

listaController.saveLista = async(req, res) => {
    const datosImagen = req.file;
    console.log("datos de la imagen" + req.file);
    console.log("DATOS VARIABLE GLOBAL = " + nombreImagen);

    const datos = req.body.nombre;    
    console.log('DATOS: ' + datos);
    try {
        const lista = {
            nombre_lista: datos,
            boleta_img: nombreImagen
        }
        let sql = 'INSERT INTO listas SET ?';
        await pool.query(sql, [lista]);
        req.flash('success_msg', 'Se ha creado una nueva lista');
        res.redirect('/listas/render');
    } catch (error) {
        console.log('|-->DB-Error: '+ error);
        req.flash('errors_msg','Error al guardar la lista');
        res.redirect('/');
    }
}
module.exports = listaController;