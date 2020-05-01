var express = require('express')
var router = express.Router()
var controller = require('../controllers/user.controller')
var validate = require('../validate/user.validate')

router.get('/', controller.index);

router.get('/create', controller.create);

router.post('/create', validate.postCreate,controller.postCreate);


module.exports = router;