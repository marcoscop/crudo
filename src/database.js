
const mysql = require('mysql');
const { promisify } = require('util');

const { database } = require('./key');

const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('LA CONEXION CON LA BASE DE DATOS HA SIDO CERRADA');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('La base de datos tiene muchas conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('La conexion a la base de datos ha sido rechazada');
        }
    }
    if (connection) connection.release();
    console.log('DB IS CONNECTED');
    return;
});
// promisify  Pool Query  --> convirtiendo a promesas para poder usar async y await
pool.query = promisify(pool.query);

module.exports = pool;