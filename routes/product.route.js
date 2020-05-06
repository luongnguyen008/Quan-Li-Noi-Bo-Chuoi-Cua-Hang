var express = require('express');
var multer = require('multer');

var router = express.Router();
var controller = require('../controllers/product.controller');

var upload = multer({ dest: '../public/uploads/' });

router.get('/', controller.index);

router.get('/search',upload.single('picture'), controller.searchProducts);


module.exports = router;