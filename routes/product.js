'use strict'

var ProductController = require('../controllers/product')
var express = require('express');
const app = require('../app');
var router = express.Router();
var md_auth = require('../middlewares/authenticated')

router.post('/saveproduct/:markid', md_auth.authenticated, ProductController.add)
router.put('/editproduct/:productid', md_auth.authenticated, ProductController.update)
router.delete('/removeproduct/:productid/:markid', md_auth.authenticated, ProductController.delete)

module.exports = router;
