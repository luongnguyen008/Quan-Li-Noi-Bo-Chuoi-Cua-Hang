var express = require('express')
var multer = require('multer');
var router = express.Router()
var controller = require('../controllers/store.controller')
var upload = multer({ dest: './public/uploads/' });

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

router.get('/:storeId/products',upload.single('picture'), controller.storeProducts);

router.get('/:storeId/products/createProduct', controller.createProduct);

router.post('/:storeId/products/createProduct', upload.single('picture'), controller.postCreateProduct);

router.get('/:storeId/products/searchProducts',upload.single('picture'),controller.searchProducts)

router.get('/:storeId/products/editProduct/:id', controller.editProducts);

router.post('/:storeId/products/editProduct/:id', upload.single('picture'), controller.postEditProducts);

router.get('/:storeId/edit', controller.editStores);

router.post('/:storeId/edit', controller.postEditStores);

router.get('/:storeId/products/deleteProduct/:id', controller.deleteProducts);

module.exports = router;