'use strict';

var _ = require('lodash');
var Data = require('./data.model');
var Player = require('../user/user.model');
var Game = require('../game/game.model');
var Score = require('../score/score.model');

function handleError(res, err) {
  return res.send(500, err);
}

var validationError = function(res, err) {
  return res.json(422, err);
};


function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

function random(low, high) {
  return Math.random() * (high - low) + low;
}

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

var gameNames = ['wash', 'trash', 'flash'];

exports.reset = function(req, res) {
    Game.remove({}, function(err) {
      console.log('Game removed')
    });
    Score.remove({}, function(err) {
      console.log('Score removed')
    });
    Player.remove({}, function(err) {
      console.log('Player removed')
    });

    return res.json("Reset ok!");
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
      roles: "admin",
      hashedPassword: "comem"
    }, {
      email: "Flo@flo.com",
      pseudo: "Flo",
      roles: "admin",
      hashedPassword: "comem"
    }, {
      email: "Ro@Ro.com",
      pseudo: "Ro",
      roles: "admin",
      hashedPassword: "comem"
    }, {
      email: "Chri@Chri.com",
      pseudo: "Chri",
      hashedPassword: "comem"
    }, {
      email: "Lau@lau.com",
      pseudo: "Lau",
      hashedPassword: "comem"
    }, {
      email: "Cle@Cle.com",
      pseudo: "Cle",
      hashedPassword: "comem"
    }, {
      email: "Cha@Cha.com",
      pseudo: "Cha",
      hashedPassword: "comem"
    });

    return res.json("Data populate ok!");

  });


};

exports.createScore = function(req, res) {

  Player.find()
    .select("id")
    .exec(function(err, usersIds) {
      if (err) return res.send(500, err);
      var id ;
      for (var i = 0; i < 100; i++) {
         id = usersIds[randomInt(0, usersIds.length)].id;

        var newScore = new Score();
        newScore.pts = randomInt(1, 100);
        newScore.player = id;
        newScore.gameName = gameNames[randomInt(0, gameNames.length)];
        newScore.save(function(err, score) {
          if (err) return validationError(res, err);
          console.log(score.player);
          Player.findById(score.player)
            .select('-hashedPassword')
            .populate('scores')
            .exec(function(err, player) {
            //  console.log("player :"+player);
              if (err) return res.send(500, err);
              player.scores.push(score.id);
              player.save(function(err, player) {
                if (err) return validationError(res, err);
              });
            })
        });
      }
      return res.json("score ok");

    })

};



