var express = require('express')
var router = express.Router()
var controller = require('../controllers/store.controller')

router.get('/', controller.index);

router.get('/:storeId', controller.viewStore);

router.get('/:storeId/users', controller.storeUsers);

router.get('/:storeId/users/search', controller.searchUsers);

router.get('/:storeId/users/:userId', controller.viewUsers);

router.get('/:storeId/users/edit/:userId', controller.editUsers);

router.post('/:storeId/users/edit/:userId', controller.postEditUsers);

router.get('/:storeId/users/delete/:userId', controller.deleteUsers);

router.get('/:storeId/products', controller.storeProducts);

module.exports = router;