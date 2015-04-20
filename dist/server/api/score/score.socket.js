/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Score = require('./score.model');

exports.register = function(socket) {
  Score.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Score.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('score:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('score:remove', doc);
}