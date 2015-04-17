'use strict';

var express = require('express');
var controller = require('./data.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();


router.post('/data',controller.createData);



module.exports = router;