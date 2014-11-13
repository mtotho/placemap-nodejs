'use strict';

var _ = require('lodash');
var Studyarea = require('./studyarea.model');

// Get list of studyareas
exports.index = function(req, res) {
  Studyarea.find(function (err, studyareas) {
    if(err) { return handleError(res, err); }
    return res.json(200, studyareas);
  });
};

// Get a single studyarea
exports.show = function(req, res) {
  Studyarea.findById(req.params.id, function (err, studyarea) {
    if(err) { return handleError(res, err); }
    if(!studyarea) { return res.send(404); }
    return res.json(studyarea);
  });
};

// Creates a new studyarea in the DB.
exports.create = function(req, res) {
  Studyarea.create(req.body, function(err, studyarea) {
    if(err) { return handleError(res, err); }
    return res.json(201, studyarea);
  });
};

// Updates an existing studyarea in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Studyarea.findById(req.params.id, function (err, studyarea) {
    if (err) { return handleError(res, err); }
    if(!studyarea) { return res.send(404); }
    var updated = _.merge(studyarea, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, studyarea);
    });
  });
};

// Deletes a studyarea from the DB.
exports.destroy = function(req, res) {
  Studyarea.findById(req.params.id, function (err, studyarea) {
    if(err) { return handleError(res, err); }
    if(!studyarea) { return res.send(404); }
    studyarea.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}