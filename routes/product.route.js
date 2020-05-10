var express = require('express')
var router = express.Router()
var controller = require('../controllers/product.controller')

router.get('/', controller.index);
router.get('/search', controller.searchProducts);


module.exports = router;