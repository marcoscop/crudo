const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
//const fetch = require('node-fetch');
const passport = require('passport');

//const bodyParser = require('body-parser');
const flash = require('connect-flash');
const multer = require('multer');
const {v4:uuid} = require('uuid');
//const myConnection = require('express-myconnection');
const storage = multer.diskStorage({        //-->  CONFIGURACION DE ALMACENAMIENTO DE MULTER
    destination: path.join(__dirname, 'public/imgListas'),
    filename: (req, file, cb ) => {
        //console.log('Nombre: ' + file.filename);
        global.nombreImagen = uuid() + path.extname(file.originalname).toLowerCase();
        console.log("Nombre Imagen: " + nombreImagen);
        
        cb(null, nombreImagen);
        //cb(null, uuid() + path.extname(file.originalname).toLowerCase());        
    }
});
// Inicializacion
const app = express();
require('./config/passport');
// Configuraciones
app.set('port', process.env.PORT || 9000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:'.hbs',
//    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');
// UPLOAD FILE
//app.use(fileUpload())

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({   //--> para guardar mensajes en el servidor -  flash se basa en este modulo
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));

app.use(multer({
    storage: storage,
    dest: path.join(__dirname, 'public/imgListas'),  // --> PATH EN DONDE SE GUARDARAN LAS IMAGENES
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname));
        if (mimetype && extname){
            return cb(null, true);
        }
        //cb(null, false);
        //cb('Error: Formato de archivo incorrecto');
        cb(new Error ('Algo salio mal'), false);
    }
}).single('img_file')); //--> METODO SINGLE PARA SUBIR IMAGENES DE A UNA Y EL NAME DEL ELEMENTO HTML QUE CONTIENE LA IMAGEN


// Modulos para autenticacion
app.use(passport.initialize());
app.use(passport.session());
// Fin Modulos para autenticacion
app.use(flash()); 
// Globals variable
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.warning_msg = req.flash('warning_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});
// Routes
app.use(require('./routers/index.router'));
app.use(require('./routers/curso.router'));
app.use(require('./routers/alumno.router'));
app.use(require('./routers/voto.router'));
app.use(require('./routers/login.router'));
app.use(require('./routers/lista.router'));
app.use(require('./routers/result.router'));
app.use(require('./routers/user.router'));
// Static Files
app.use(express.static(path.join(__dirname, 'public'))); 
module.exports = app;