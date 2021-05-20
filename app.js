'use strict'

//cargar requires
const express = require('express')
const bodyParser = require('body-parser')
/* cargar express */
const app = express()


/* cargar archivos de rutas */
var category_routes= require('./routes/category')

/* añadir middlewares */
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
/* config CORS */

/* Reescribir rutas */
app.use('/api', category_routes)

/* exportar modulo */
module.exports=app