const resultController = {};

const pool = require('../database');

resultController.renderResult = async (req, res) => {

  try {
    let sql = 'SELECT listas.nombre_lista, count(listas.id) AS cantidadVotos FROM `votos` INNER JOIN listas on votos.id_lista = listas.id GROUP BY listas.id ORDER BY COUNT(listas.id) DESC';
    const listaResultados = await pool.query(sql);

    if (Object.keys(listaResultados).length > 0) {
      res.render('result/resultGraph', {
        listaResultados
      });
    } else {
      req.flash('warning_msg', 'Aun no se ha realizado votaciones.');
      res.redirect('/');
    }
  } catch (error) {
    req.flash('errors_msg', 'Se ha producido un error al consultar la Base de Datos.');
    res.redirect('/');
  }

}

module.exports = resultController;