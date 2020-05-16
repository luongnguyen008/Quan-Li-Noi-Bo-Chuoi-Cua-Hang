var express = require('express');
var multer = require('multer');

var router = express.Router();
var controller = require('../controllers/product.controller');

var upload = multer({ dest: '../public/uploads/' });

router.get('/', controller.index);

router.get('/search',upload.single('picture'), controller.searchProducts);

router.get('/changePassword/:id' , controller.changePassword);

router.post('/changePassword/:id' , controller.postChangePassword);

module.exports = router;