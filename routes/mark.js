'use strict'

var MarkController = require('../controllers/mark')
var express = require('express');
const app = require('../app');
var router = express.Router();
var md_auth = require('../middlewares/authenticated')

router.get('/getmark', MarkController.getMarks);
router.post('/addmark', md_auth.authenticated, MarkController.save)
router.delete('/delete/:id', md_auth.authenticated, MarkController.deleteMarks)

module.exports = router;