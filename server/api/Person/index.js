'use strict';

var express = require('express');
var controller = require('./Person.controller');

var router = express.Router();

router.get('/ppppeople', controller.index);
router.get('/ppppeople/:id', controller.show);
router.post('/', controller.create);
//router.put('/:id', controller.update);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;