'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var fs = require('fs');

// Get list of images
exports.index = function(req, res) {
  Image.find(function(err, images) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, images);
  });
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function(err, image) {
    if (err) {
      return handleError(res, err);
    }
    if (!image) {
      return res.send(404);
    }
    return res.end(image.data,'binary');
  });
};

// Creates a new image in the DB.
exports.create = function(req, res) {
 // if (!req.body.img) {res.json("json invalid");}

var imagePath = "imageTest/flower.png"

  Image.create(req.body, function(err, a) {
    if (err) {
      return handleError(res, err);
    }
    if (!a) {
      res.json("image not created");
    }
    a.data = fs.readFileSync(String(imagePath));
    a.contentType = 'image/jpg';
    a.save(function(err, aSaved) {
      if (err) {
        return handleError(res, err);
      }
      res.json(aSaved.id);
    });

  });
};


// Updates an existing image in the DB.
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Image.findById(req.params.id, function(err, image) {
    if (err) {
      return handleError(res, err);
    }
    if (!image) {
      return res.send(404);
    }
    var updated = _.merge(image, req.body);
    updated.save(function(err) {
      if (err) {
        return handleError(res, err);
      }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function(err, image) {
    if (err) {
      return handleError(res, err);
    }
    if (!image) {
      return res.send(404);
    }
    image.remove(function(err) {
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