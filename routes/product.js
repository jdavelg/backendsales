'use strict'

var ProductController = require('../controllers/product')
var express = require('express');
const app = require('../app');
var router = express.Router();
var md_auth = require('../middlewares/authenticated')

app.post('/saveproduct/:markid', md_auth.authenticated, ProductController.add)
app.put('/editproduct/:productid', md_auth.authenticated, ProductController.update)
app.delete('/removeproduct/:productid/:markid', md_auth.authenticated, ProductController.delete)

module.exports = router;