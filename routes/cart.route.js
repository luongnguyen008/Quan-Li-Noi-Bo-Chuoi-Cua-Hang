var express = require('express')
var router = express.Router()
var controller = require('../controllers/cart.controller')

router.get('/', controller.cartIndex)
router.get('/add/:productId', controller.addToCart);
router.get('/remove/:productId', controller.removeFromCart);
router.get('/checkout', controller.checkOut);

module.exports = router;