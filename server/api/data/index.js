'use strict';

var express = require('express');
var controller = require('./data.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.post('/',auth.isAuthenticated(),auth.hasRole('admin'),controller.create);


module.exports = router;