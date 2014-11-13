'use strict';

var _ = require('lodash');
var Placemarker = require('./placemarker.model');

// Get list of placemarkers
exports.index = function(req, res) {
  Placemarker.find(function (err, placemarkers) {
    if(err) { return handleError(res, err); }
    return res.json(200, placemarkers);
  });
};

// Get a single placemarker
exports.show = function(req, res) {
  Placemarker.findById(req.params.id, function (err, placemarker) {
    if(err) { return handleError(res, err); }
    if(!placemarker) { return res.send(404); }
    return res.json(placemarker);
  });
};

// Creates a new placemarker in the DB.
exports.create = function(req, res) {
  Placemarker.create(req.body, function(err, placemarker) {
    if(err) { return handleError(res, err); }
    return res.json(201, placemarker);
  });
};

// Updates an existing placemarker in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Placemarker.findById(req.params.id, function (err, placemarker) {
    if (err) { return handleError(res, err); }
    if(!placemarker) { return res.send(404); }
    var updated = _.merge(placemarker, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, placemarker);
    });
  });
};

// Deletes a placemarker from the DB.
exports.destroy = function(req, res) {
  Placemarker.findById(req.params.id, function (err, placemarker) {
    if(err) { return handleError(res, err); }
    if(!placemarker) { return res.send(404); }
    placemarker.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}