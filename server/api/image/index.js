'use strict';

var express = require('express');
var controller = require('./image.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.isAuthenticated(),controller.index);
router.get('/:id',auth.isAuthenticated(),controller.show);
router.post('/',auth.isAuthenticated(),controller.create);
router.put('/:id',auth.hasRole('admin'),controller.update);
router.delete('/:id',auth.isAuthenticated(),auth.hasRole('admin'),controller.destroy);

module.exports = router;