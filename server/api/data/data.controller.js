'use strict';

var _ = require('lodash');
var Data = require('./data.model');
var Player = require('../user/user.model');
var Game = require('../game/game.model');
var Score = require('../score/score.model');

function randomInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }
  // Creates a new data in the DB.
exports.createData = function(req, res) {

  Game.find({}).remove(function() {
    Game.create({
      name: 'trash',
    }, {
      name: 'wash',
    }, {
      name: 'flash',
    })
  });

  Player.find({}).remove(function() {
    Player.create({
      email: "Mat@mat.com",
      pseudo: "Mat",
      roles :"admin",
      hashedPassword: "comem"
    }, {
      email: "Flo@flo.com",
      pseudo: "Flo",
      roles :"admin",
      hashedPassword: "comem"
    }, {
      email: "Ro@Ro.com",
      pseudo: "Ro",
      roles :"admin",
      hashedPassword: "comem"
    });

return res.json("Data populate ok!");

  });




};

exports.createScore = function(req, res) {


  Player.find({}, '-hashedPassword', function(err, player) {
    if (err) return res.send(500, err);

    console.log(player)

    Score.find({}).remove(function() {
      Score.create({
        pts: randomInt(1, 100),
        player: player[0].id,
        gameName: "Trash"
      }, {
        pts: randomInt(1, 100),
        player: player[1].id,
        gameName: "Flash"
      }, {
        pts: randomInt(1, 100),
        player: player[2].id,
        gameName: "Wash"
      }, {
        pts: randomInt(1, 100),
        player: player[0].id,
        gameName: "Trash"
      }, {
        pts: randomInt(1, 100),
        player: player[1].id,
        gameName: "Wash"
      }, {
        pts: randomInt(1, 100),
        player: player[2].id,
        gameName: "Flash"
      }, {
        pts: randomInt(1, 100),
        player: player[0].id,
        gameName: "Trash"
      }, {
        pts: randomInt(1, 100),
        player: player[1].id,
        gameName: "Wash"
      }, {
        pts: randomInt(1, 100),
        player: player[2].id,
        gameName: "Flash"
      });

        return res.json("Score populate ok!");

    });

  });

};



function handleError(res, err) {
  return res.send(500, err);
}