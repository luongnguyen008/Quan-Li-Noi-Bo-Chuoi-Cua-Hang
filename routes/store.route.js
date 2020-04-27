var express = require('express')
var router = express.Router()
var controller = require('../controllers/store.controller')

router.get('/', controller.index);

router.get('/createStore', controller.createStore);

router.post('/createStore', controller.postCreateStore);

router.get('/deleteStore/:storeId', controller.deleteStore);

router.get('/:storeId', controller.viewStore);

router.get('/:storeId/users', controller.storeUsers);

router.get('/:storeId/users/search', controller.searchUsers);

router.get('/:storeId/users/:userId', controller.viewUsers);

router.get('/:storeId/users/edit/:userId', controller.editUsers);

router.post('/:storeId/users/edit/:userId', controller.postEditUsers);

router.get('/:storeId/users/delete/:userId', controller.deleteUsers);

router.get('/:storeId/products', controller.storeProducts);

router.get('/:storeId/edit', controller.editStores);

router.post('/:storeId/edit', controller.postEditStores);


module.exports = router;