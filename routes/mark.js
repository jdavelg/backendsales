'use strict'

var MarkController= require('../controllers/mark')
var express= require('express');
const app = require('../app');
var router= express.Router();


router.get('/getmark', MarkController.getMarks);
router.post('/addmark', MarkController.save)

module.exports= router;