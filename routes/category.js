'use strict'

var CategoryController=require('../controllers/category')
var express= require('express');
const app = require('../app');
var router= express.Router();

app.post('/savecategory', CategoryController.save)
app.get('/getcategories', CategoryController.getCategories)


module.exports=router;