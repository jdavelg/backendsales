'use strict'

var CategoryController=require('../controllers/category')
var express= require('express');
const app = require('../app');
var router= express.Router();
var md_auth = require('../middlewares/authenticated')

app.post('/savecategory',md_auth.authenticated, CategoryController.save)
app.get('/getcategories',md_auth.authenticated, CategoryController.getCategories)


module.exports=router;