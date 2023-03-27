import express from 'express';
//const express = require('express');
import router from './routes/index.js';
import db from './config/db.js';

const app = express();

db.authenticate()
    .then( () => console.log('BD ON ..'))
    .catch( error => console.log(error) );

const port = process.env.PORT || 4000;

//Habilitar pug
app.set('view engine', 'pug');

app.use( (req, res, next) => {
    const year = new Date();
    res.locals.actualyear = year.getFullYear();
    res.locals.nombreSitio = 'Agencia de Viajes';
    return next();
});

//Agregar body parser para leer los datos del formularios
app.use( express.urlencoded( { extended : true } ) );

app.use(express.static('public'));

app.use('/' , router);

app.listen(port, () => {
    console.log(`El servidor funciona en el puerto ${port}`);
})