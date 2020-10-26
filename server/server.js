const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

mongoose.set('useFindAndModify', false);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuracion global de rutas 
app.use(require('./routes/index'));

// Conectar Base de Datos
mongoose.connect('mongodb://localhost:27017/actitud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (err, res) => {

    if (err) throw err;
    console.log('Base de datos online');
});

// Conectar al puerto 3000
app.listen(3000, () => {
    console.log("Escucnado el puerto ", 3000);
});