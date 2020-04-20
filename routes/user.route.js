var express = require('express')
var router = express.Router()
var controller = require('../controllers/user.controller')

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', controller.postCreate);

router.get('/search', controller.search);

router.get('/:id', controller.viewUser);

router.get('/delete/:id', controller.delete);

router.get('/edit/:id', controller.edit);

router.post('/edit/:id', controller.postEdit);

module.exports = router;