const userController = {}

const pool = require('../database');

const bcrypt = require('bcryptjs');

const passport = require('passport');

userController.renderAllUsers = async (req, res) => {
    try {
        let sql = 'SELECT * FROM admins';
        const listaUser = await pool.query(sql);
        if (Object.keys(listaUser).length > 0) {
            //console.log('POOOOOOOCHAAAAA');
            res.render('usuarios/usuarios', {
                listaUser
            });
        } else {
            req.flash('warning_msg', 'No existen usuarios aun');
            res.render('usuarios/usuarios');
        }
    } catch (error) {
        console.log('DB-Error -->' + error);
        req.flash('errors_msg', 'Se ha producido un error con la base de datos');
        res.redirect('/')
    }
}

userController.renderNewUser = async (req, res) => {
    res.render('usuarios/add-usuarios');
}

userController.addNewUser = async (req, res) => {
    const { nombre, password, confirm_password } = req.body;
    let errorMsg = [];
    try {
        if (password === confirm_password) {
            let sql = "SELECT nombre FROM admins WHERE nombre = ?";
            const listaUser = await pool.query(sql, [nombre]);
            if (Object.keys(listaUser).length > 0) {
                errorMsg.push({ msg: 'El nombre de Usuario ya existe' });
            } else {
                const salt = await bcrypt.genSalt(10);
                const encriptPass = await bcrypt.hash(password, salt);
                const user = {
                    nombre: nombre,
                    password: encriptPass
                };
                sql = "INSERT INTO admins SET ?";
                await pool.query(sql, [user]);
                req.flash('success_msg', 'Usuario creado con exito');
            }
        } else {
            errorMsg.push({ msg: 'Password y la confirmacion de Password deben ser iguales' });
        }
    } catch (error) {

    } finally {
        if (errorMsg.length > 0) {
            res.render('usuarios/add-usuarios', {
                errorMsg,
                nombre
            });
        } else {
            res.redirect('/user/user');
        }
    }

};

userController.renderEditUser = async (req, res) => {
    try {
        let sql = "SELECT * FROM admins WHERE admins.id = ?";
        const usuario = await pool.query(sql, [req.params.id]);
        //const datosUsuario = usuario;
        //console.log("DATOS USUARIO: " + usuario);
        res.render('usuarios/edit-usuarios', {
            usuario
        })
    } catch (error) {
        console.log('DB-Error: Se ha producido un error con la BD = ', error);
        res.redirect('/');
    }
};

userController.updateUser = async (req, res) => {
    let errorMsg = [];
    try {
        const { nombre, password, confirm_password } = req.body;
        const id = req.params.id;
        //console.log(req.body)
        if (password === confirm_password) {
            //let sql = "SELECT nombre FROM admins WHERE nombre = ?";
            //const listaUser = await pool.query(sql, [nombre]);
            const salt = await bcrypt.genSalt(10);
            const encriptPass = await bcrypt.hash(password, salt);
            const user = {
                nombre: nombre,
                password: encriptPass
            };
            sql = "UPDATE admins SET ? WHERE admins.id = ?";
            //console.log('datos actualizados: ' + user);
            await pool.query(sql, [user, id]);
            req.flash('success_msg', 'Datos de Usuario actualizados con exito');
        } else {
            errorMsg.push({ msg: 'Password y la confirmacion de Password deben ser iguales' });
        }
    } catch (error) {
        console.log('|-->DB-Error: ', error);
    } finally {
        if (errorMsg.length > 0) {
            res.render('usuarios/edit-usuarios', {
                errorMsg,
                nombre
            });
        } else {
            res.redirect('/user/user');
        }
    }

    //res.send(req.body);
};

userController.deleteUser = async(req, res) => {
    const id = req.params.id;
    try {
        let sql = "DELETE FROM admins WHERE admins.id = ?";
        await pool.query(sql, [id]);
        req.flash('success_msg', 'Se ha eliminado a un usuario');
        //sql = "SELECT * FROM admins";
        //const listaUser = await pool.query(sql);
        /*res.render('usuarios/usuarios', {
            listaUser
        });*/
        res.redirect('/user/user');
    } catch (error) {
        console.log('|-->DB-Error: ' + error);
        req.redirect('/');
    }    
};

module.exports = userController;