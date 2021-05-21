'use strict'

var UserController= require('../controllers/user')
var express= require('express');
const app = require('../app');
var router= express.Router();

router.post('/saveuser', UserController.save)

module.exports= router