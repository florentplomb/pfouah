'use strict';

var express = require('express');
var controller = require('./data.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.post('/data',controller.createData);
router.post('/score',auth.isAuthenticated(),auth.hasRole('admin'),controller.createScore);


module.exports = router;