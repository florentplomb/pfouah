'use strict';

var express = require('express');
var controller = require('./game.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/:name',auth.isAuthenticated(), controller.show);
router.get('/:id/rank',auth.isAuthenticated(), controller.rank);
router.post('/',auth.hasRole('admin'), controller.create);
router.put('/:id',auth.hasRole('admin'), controller.update);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;