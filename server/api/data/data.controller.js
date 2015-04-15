'use strict';

var _ = require('lodash');
var Data = require('./data.model');
var Player = require('../user/user.model');
var Game = require('../game/game.model');


// Creates a new data in the DB.
exports.create = function(req, res) {

Game.find({}).remove(function() {
 Game.create(
 {
    name : 'Trash',
  },
  {
    name : 'Wash',
  },
  {
    name : 'Flash',
  }
)
});


Player.find({}).remove(function() {
 Player.create({
    email : "Mat@mat.com",
    pseudo : "Mat",
     hashedPassword : "1234"
  }, {
        email : "Flo@flo.com",
    pseudo : "Flo",
     hashedPassword : "1234"
  }, {
        email : "Ro@Ro.com",
    pseudo : "Ro",
     hashedPassword : "1234"
  }
  );
});

    return res.json("populate ok!");

};


function handleError(res, err) {
  return res.send(500, err);
}