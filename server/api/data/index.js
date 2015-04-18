'use strict';

var express = require('express');
var controller = require('./data.controller');


var router = express.Router();


router.post('/data',controller.createData);
router.post('/reset',controller.reset);
router.post('/score',controller.createScore);



module.exports = router;