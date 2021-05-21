'use strict'

var UserController= require('../controllers/user')
var express= require('express');
const app = require('../app');
var md_auth=require('../middlewares/authenticated')
var router= express.Router();

router.post('/saveuser', UserController.save)
router.post('/login', UserController.login)
router.put('/updateuser', md_auth.authenticated, UserController.update)
module.exports= router