'use strict';

var _ = require('lodash');
var QuestionType = require('./question_type.model');

// Get list of question_types
exports.index = function(req, res) {
  QuestionType.find(function (err, question_types) {
    if(err) { return handleError(res, err); }
    return res.json(200, question_types);
  });
};

// Get a single question_type
exports.show = function(req, res) {
  QuestionType.findById(req.params.id, function (err, question_type) {
    if(err) { return handleError(res, err); }
    if(!question_type) { return res.send(404); }
    return res.json(question_type);
  });
};

// Creates a new question_type in the DB.
exports.create = function(req, res) {
  QuestionType.create(req.body, function(err, question_type) {
    if(err) { return handleError(res, err); }
    return res.json(201, question_type);
  });
};

// Updates an existing question_type in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  QuestionType.findById(req.params.id, function (err, question_type) {
    if (err) { return handleError(res, err); }
    if(!question_type) { return res.send(404); }
    var updated = _.merge(question_type, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, question_type);
    });
  });
};

// Deletes a question_type from the DB.
exports.destroy = function(req, res) {
  QuestionType.findById(req.params.id, function (err, question_type) {
    if(err) { return handleError(res, err); }
    if(!question_type) { return res.send(404); }
    question_type.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}