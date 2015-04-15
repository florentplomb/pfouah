'use strict';

var _ = require('lodash');
var Score = require('./score.model');
var Player = require('../user/user.model');
var Game = require('../game/game.model');

// Get list of scores
exports.index = function(req, res) {
  Score.find(function(err, scores) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, scores);
  });
};

// Get a single score
exports.show = function(req, res) {
  Score.findById(req.params.id, function(err, score) {
    if (err) {
      return handleError(res, err);
    }
    if (!score) {
      return res.send(404);
    }
    return res.json(score);
  });
};

// Creates a new score in the DB.

exports.create = function(req, res) {
  // Score.create(req.body, function(err, score) {
  //   if (err) {
  //     return handleError(res, err);
  //   }
     Game.findOne({name:req.body.gameName}, function(err, game) {
      if (err) {
        return handleError(res, err);
      }
        if (!game) {
        return handleError(res, "game doesn't exist");

      }

      var gameName = game.name;

      Player.findById(req.body.player, function(err, player) {
        if (err) {
          return handleError(res, err);
        }
             if (!player) {
        return handleError(res, "player doesn't exist");
      }

        var scoretot = player.totalScore;
        player.totalScore = scoretot + parseInt(req.body.pts);
        player.save(function(err, playerSaved) {
          if (err) {
            return handleError(res, err);
          }

        });

        switch (gameName) {
          case "Trash":
            if (req.body.pts > player.hsTrash) {
              player.hsTrash = req.body.pts
              player.totalHs=player.hsWash+player.hsFlash+player.hsTrash;
              player.save(function(err, playerSaved) {
                 if (err) {
            return handleError(res, err);
          }
                res.json(playerSaved);
              });
            } else {
              res.json(player);
            }

            break;
          case "Wash":
            if (req.body.pts > player.hsWash) {
              player.hsWash = req.body.pts
               player.totalHs=player.hsWash+player.hsFlash+player.hsTrash;
              player.save(function(err, playerSaved) {
                 if (err) {
            return handleError(res, err);
          }
                res.json(playerSaved);
              });
            } else {
              res.json(player);
            }
            break;
          case "Flash":
            if (req.body.pts > player.hsFlash) {
              player.hsFlash = req.body.pts
               player.totalHs=player.hsWash+player.hsFlash+player.hsTrash;
              player.save(function(err, playerSaved) {
                 if (err) {
            return handleError(res, err);
          }
                res.json(playerSaved);
              });
            } else {
              res.json(player);
            }
            break;

        }

       });

     });
  // });
};

// Updates an existing score in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Score.findById(req.params.id, function(err, score) {
    if (err) {
      return handleError(res, err);
    }
    if (!score) {
      return res.send(404);
    }
    var updated = _.merge(score, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, score);
    });
  });
};

// Deletes a score from the DB.
exports.destroy = function(req, res) {
  Score.findById(req.params.id, function(err, score) {
    if (err) {
      return handleError(res, err);
    }
    if (!score) {
      return res.send(404);
    }
    score.remove(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}