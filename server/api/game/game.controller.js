'use strict';

var _ = require('lodash');
var Game = require('./game.model');
var Player = require('../user/user.model');

var validationError = function(res, err) {
  return res.json(422, err);
};
// Get list of games
exports.index = function(req, res) {
  Game.find(function(err, games) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, games);
  });
};

// Get a single game
exports.show = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.send("game dosen't exist");
    }
    // Find First 10 News Items
    // Player.find({
    //     deal_id: player._id // Search Filters
    //   }, ['email'], // Columns to Return
    //   {
    //     skip: 0, // Starting Row
    //     limit: 10, // Ending Row
    //     sort: {
    //       date_added: -1 //Sort by Date Added DESC
    //     }
    //   }
    // );
Player
.find()
.sort('hsTrash')
.select('name occupation')
.exec(players);


    res.json(player);
  });
};



// Creates a new game in the DB.
exports.create = function(req, res) {

  if (!req.body.name) {return res.json("json invalide");}

  Game.create(req.body, function(err, game) {
    if (err) return validationError(res, err);
    if (err) {
      return handleError(res, err);
    }
    return res.json(201, game);
  });
};

// Updates an existing game in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.send(404);
    }
    var updated = _.merge(game, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, game);
    });
  });
};

// Deletes a game from the DB.
exports.destroy = function(req, res) {
  Game.findById(req.params.id, function(err, game) {
    if (err) {
      return handleError(res, err);
    }
    if (!game) {
      return res.send(404);
    }
    game.remove(function(err) {
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