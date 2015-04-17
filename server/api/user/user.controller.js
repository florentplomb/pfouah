'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */


exports.index = function(req, res) {
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  if (!req.body.email) return res.send("Need email");
  if (!req.body.pseudo) return res.send("Need pseudo");
  if (!req.body.hashedPassword) return res.send("Need password");

  var newUser = new User();
  newUser.email = req.body.email;
  newUser.pseudo = req.body.pseudo;
  newUser.hashedPassword = req.body.hashedPassword;
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    // var token = jwt.sign({
    //   _id: user._id
    // }, config.secrets.session, {
    //   expiresInMinutes: 60 * 5
    // });
    res.json({
      user: user.profile,
      // token: token
    });
  });
};

exports.like = function(req, res, next) {
  var userId = req.params.id;
  User.findById(userId, function(err, player) {
    if (err) return next(err);
    if (!player) return res.send("User doesn't exist");
    if (!req.body.like) return res.send("like in json doesn't exist");

    switch (req.body.like) {
      case 1:
        player.like = player.like + 1
        player.save(function(err, playerSaved) {
          if (err) {
            return handleError(res, err);
          }
          res.json(playerSaved.email + ": +1 => like = " + playerSaved.like);
        });
        break;

      case -1:
        player.like = player.like - 1
        player.save(function(err, playerSaved) {
          if (err) {
            return handleError(res, err);
          }
          res.json(playerSaved.email + ": -1 => like = " + playerSaved.like);
        });
        break;

      default:
        res.json("like value is wrong. Value = 1 for + or 0 for -");

    }
  });

};

exports.login = function(req, res, next) {

  if (!req.body.pseudo) return res.send(500, "need pseudo");
  if (!req.body.hashedPassword) return res.send(500, "need password");

  User
    .find()
    .and({
      pseudo: req.body.pseudo
    })
    .and({
      hashedPassword: req.body.hashedPassword
    })
    .exec(function(err, userFound) {
      console.log("ici" + userFound);
      if (userFound.length === 0) {

        res.status(422).json({
          message: 'wrong pseudo and password'
        }).end();

      } else {

        return res.json(userFound[0].profile);

      }
    });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;
  User.findById(userId, '-hashedPassword', function(err, user) {
    if (err) return next(err);
    if (!user) return res.send("User doesn't exist");
    user.totalHs = user.hsWash + user.hsFlash + user.hsTrash;
    user.save(function(err, userSaved) {
      if (err) return validationError(res, err);
      return res.json(userSaved);
    });

  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.send(500, err);
}