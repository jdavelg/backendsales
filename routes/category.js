'use strict'

var CategoryController=require('../controllers/category')
var express= require('express');
var app = require('../app'); 
var router= express.Router();
var md_auth = require('../middlewares/authenticated')

router.post('/savecategory',md_auth.authenticated, CategoryController.save)
router.get('/getcategories',md_auth.authenticated, CategoryController.getCategories)
router.delete('/deletecategory/:categoryid', md_auth.authenticated, CategoryController.deleteCategory)


module.exports=router;