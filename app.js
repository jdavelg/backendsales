'use strict'

//cargar requires
const express = require('express')
const bodyParser = require('body-parser')
/* cargar express */
const app = express()


/* cargar archivos de rutas */
var category_routes = require('./routes/category')
var mark_routes = require('./routes/mark')
var user_routes = require('./routes/user')
var product_routes = require('./routes/product')


/* añadir middlewares */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* config CORS */

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/* Reescribir rutas */
app.use('/api/category', category_routes)
app.use('/api/mark', mark_routes)
app.use('/api/user', user_routes)
app.use('/api/product', product_routes)

/* exportar modulo */
module.exports = app