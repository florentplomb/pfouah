'use strict';

var User = require('./user.model');
var Score = require('../score/score.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var _ = require('underscore');

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */


exports.index = function(req, res) {

  User.find()
    .select('-salt -hashedPassword')
    .populate('scores')
    .exec(function(err, users) {
      if (err) return res.send(500, err);
      return res.json(200, users);
    })

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

exports.score = function(req, res, next) {
  var usersScore = [];
  User.find()
    .populate('scores')
    .exec(function(err, users) {
      if (users.length === 0) {

        res.status(422).json({
          message: 'pas de users dans la bd'
        }).end();

      } else {

        for (var i = 0; i < users.length; i++) {
          var scores = users[i].scores
          var scoreTot = 0;
          var hsTrash = 0;
          var hsFlash = 0;
          var hsWash = 0;
          var totalHs = 0;
          var tab = {};
          var user = {};
          for (var y = 0; y < scores.length; y++) {

            scoreTot = scores[y].pts + scoreTot;

            if (scores[y].gameName === "trash") {

              if (scores[y].pts > hsTrash) {
                hsTrash = scores[y].pts;
              };

            }
            if (scores[y].gameName === "flash") {

              if (scores[y].pts > hsFlash) {
                hsFlash = scores[y].pts;
              };

            }
            if (scores[y].gameName === "wash") {

              if (scores[y].pts > hsWash) {
                hsWash = scores[y].pts;
              };

            }

          }
          totalHs = hsWash + hsTrash + hsFlash;
          tab = {
            "scoreTot": scoreTot,
            "hsWash": hsWash,
            "hsFlash": hsFlash,
            "hsTrash": hsTrash,
            "totalHs": totalHs
          };
          user.id = users[i].id;
          user.pseudo = users[i].pseudo;
          user.email = users[i].email;
          user.imgUrl = users[i].imgUrl;
          user.like = users[i].like;
          user.scores = tab;

          usersScore.push(user);

        }

        return res.json(usersScore);
      }



    })


};
        function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {

          for (var i = 0; i < arraytosearch.length; i++) {

            if (arraytosearch[i][key] == valuetosearch) {
              return i;
            }
          }
          return null;
        };

exports.userScore = function(req, res, next) {


  var usersScore = [];
  var usr = {}
  User.find()
    .populate('scores')
    .exec(function(err, users) {
      if (users.length === 0) {

        res.status(422).json({
          message: 'pas de users dans la bd'
        }).end();

      } else {

        for (var i = 0; i < users.length; i++) {
          var scores = users[i].scores
          var scoreTot = 0;
          var usr = {};

          for (var y = 0; y < scores.length; y++) {

            scoreTot = scores[y].pts + scoreTot;

          }
          usr.id = users[i].id;
          usr.pts = scoreTot;
          usersScore.push(usr);
        }
        usersScore.sort(function(a, b) {
          return parseInt(a.pts) - parseInt(b.pts)
        });
        usersScore.reverse();
        var index = functiontofindIndexByKeyValue(usersScore, "id", req.params.id);
        index++;
        return res.json(index);

      }


    })


  // var scoreTot = 0;
  // var hsTrash = 0;
  // var hsFlash = 0;
  // var hsWash = 0;
  // var totalHs = 0;

  // Score.find()
  //   .and({
  //     player: req.params.id
  //   })
  //   .exec(function(err, scores) {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (scores === null) {
  //       return res.json({
  //         code: 204,
  //         message: "Score is Empty"
  //       }).end();
  //     }

  //     for (var i = 0; i < scores.length; i++) {
  //       scoreTot = scores[i].pts + scoreTot;

  //       if (scores[i].gameName === "trash") {

  //         if (scores[i].pts > hsTrash) {
  //           hsTrash = scores[i].pts;
  //         };

  //       }
  //       if (scores[i].gameName === "flash") {

  //         if (scores[i].pts > hsFlash) {
  //           hsFlash = scores[i].pts;
  //         };

  //       }
  //       if (scores[i].gameName === "wash") {

  //         if (scores[i].pts > hsWash) {
  //           hsWash = scores[i].pts;
  //         };

  //       }
  //     }

  //     totalHs = hsWash + hsTrash + hsFlash;
  //     var tab = {
  //       "scoreTot": scoreTot,
  //       "hsWash": hsWash,
  //       "hsFlash": hsFlash,
  //       "hsTrash": hsTrash,
  //       "totalHs": totalHs
  //     };

  //     return res.json(tab);


  //   });



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

  if (!req.body.pseudo) return res.send(400, "need pseudo");
  if (!req.body.hashedPassword) return res.send(400, "need password");

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
  User.findById(userId)
    .select('-hashedPassword')
    .populate('scores')
    .exec(function(err, user) {
      if (err) return res.send(500, err);
      return res.json(200, user.profile);
    })
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
    res.json(user.profile);
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