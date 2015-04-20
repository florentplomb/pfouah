'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  data: Buffer,
  contentType: String,
  like: Number
});

module.exports = mongoose.model('Image', ImageSchema);