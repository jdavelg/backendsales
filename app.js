'use strict'

//cargar requires
const express = require('express')
const bodyParser = require('body-parser')
/* cargar express */
const app = express()


/* cargar archivos de rutas */
var category_routes= require('./routes/category')
var mark_routes=require('./routes/mark')
var user_routes=require('./routes/user')
var product_routes=require('./routes/product')


/* añadir middlewares */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

/* config CORS */

/* Reescribir rutas */
app.use('/api/category', category_routes)
app.use('/api/mark', mark_routes)
app.use('./api/user', user_routes)
app.use('./api/product', product_routes)

/* exportar modulo */
module.exports=app