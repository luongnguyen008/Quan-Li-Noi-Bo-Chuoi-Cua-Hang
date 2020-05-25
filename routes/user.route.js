var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

router.get('/', controller.index);

router.get('/listUsers', controller.listUsers);

router.get('/listSalary', controller.listSalary);

router.get('/calculateSalary', controller.calculateSalary);

router.post('/calculateSalary', controller.postCalculateSalary)

router.get('/editSalary/:idSalary', controller.editSalary);

router.post('/editSalary/:idSalary', controller.postEditSalary);

router.get('/listSalary/searchSalary', controller.searchSalary);

router.get('/create', controller.create);

router.post('/create', validate.postCreate,controller.postCreate);

module.exports = router;