'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ScoreSchema = new Schema({
  ptsMax:Number,
  _player:{ type: Schema.Types.ObjectId, ref: 'User' },
  _game:{ type: Schema.Types.ObjectId, ref: 'Game' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);