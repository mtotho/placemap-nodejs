'use strict';

var _ = require('lodash');
var Participant = require('./participant.model');

// Get list of participants
exports.index = function(req, res) {
  Participant.find(function (err, participants) {
    if(err) { return handleError(res, err); }
    return res.json(200, participants);
  });
};

// Get a single participant
exports.show = function(req, res) {
  Participant.findById(req.params.id, function (err, participant) {
    if(err) { return handleError(res, err); }
    if(!participant) { return res.send(404); }
    return res.json(participant);
  });
};

// Creates a new participant in the DB.
exports.create = function(req, res) {
  Participant.create(req.body, function(err, participant) {
    if(err) { return handleError(res, err); }
    return res.json(201, participant);
  });
};

// Updates an existing participant in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Participant.findById(req.params.id, function (err, participant) {
    if (err) { return handleError(res, err); }
    if(!participant) { return res.send(404); }
    var updated = _.merge(participant, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, participant);
    });
  });
};

// Deletes a participant from the DB.
exports.destroy = function(req, res) {
  Participant.findById(req.params.id, function (err, participant) {
    if(err) { return handleError(res, err); }
    if(!participant) { return res.send(404); }
    participant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}