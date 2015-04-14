'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ScoreSchema = new Schema({
   pts:Number,
  player:{ type: Schema.Types.ObjectId, ref: 'User' },
  game:{ type: Schema.Types.ObjectId, ref: 'Game' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Score', ScoreSchema);