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
  if (!req.body.pts) return res.send(400, "need pseudo");
  if (!req.body.gameName) return res.send(400, "need gameName");
  Game.findOne({
    name: req.body.gameName
  }, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return handleError(res, "game doesn't exist");
    }

    Player.findById(req.headers['x-user-id'], function(err, player) {
      if (err) {
        return handleError(res, err);
      }
      if (!player) {
        return handleError(res, "player doesn't exist");
      }
      var newScore = new Score();
      newScore.pts = parseInt(req.body.pts);
      newScore.gameName = req.body.gameName;
      newScore.player = req.headers['x-user-id'];
      newScore.save(function(err, score) {
        if (err) return validationError(res, err);
        player.scores.push(score.id);
        player.save(function(err, player) {
          if (err) return validationError(res, err);
          return res.json(score);
        });

      });

    });

  });

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