'use strict';

var _ = require('lodash');
var AuditType = require('./audit_type.model');

// Get list of audit_types
exports.index = function(req, res) {
  AuditType.find(function (err, audit_types) {
    if(err) { return handleError(res, err); }
    return res.json(200, audit_types);
  }).populate('questions.question').exec();
};

// Get a single audit_type
exports.show = function(req, res) {
  AuditType.findById(req.params.id, function (err, audit_type) {
    if(err) { return handleError(res, err); }
    if(!audit_type) { return res.send(404); }
    return res.json(audit_type);
  });
};

// Creates a new audit_type in the DB.
exports.create = function(req, res) {
  AuditType.create(req.body, function(err, audit_type) {
    if(err) { return handleError(res, err); }
    return res.json(201, audit_type);
  });
};

// Updates an existing audit_type in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AuditType.findById(req.params.id, function (err, audit_type) {
    if (err) { return handleError(res, err); }
    if(!audit_type) { return res.send(404); }
    
    audit_type.name=req.body.name;
    audit_type.questions = new Array();

    for(var q in req.body.questions){
   // console.log(q);
      if(req.body.questions[q].question._id != null){

            audit_type.questions.push({
              order: req.body.questions[q].order,
              question: req.body.questions[q].question._id
            });
      }

    
    }

   // 

    var updated = audit_type;//_.merge(audit_type, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, audit_type);
    });
  });
};

// Deletes a audit_type from the DB.
exports.destroy = function(req, res) {
  AuditType.findById(req.params.id, function (err, audit_type) {
    if(err) { return handleError(res, err); }
    if(!audit_type) { return res.send(404); }
    audit_type.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}