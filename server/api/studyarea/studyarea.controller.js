'use strict';

var _ = require('lodash');
var Studyarea = require('./studyarea.model');
var AuditType = require('../audit_type/audit_type.model');
var Question = require('../question/question.model');
var Response = require('../response/response.model');
var async  = require('async');
// Get list of studyareas
exports.index = function(req, res) {

  //is_public not passed, show all
  if(req.param('is_public')==null){
      
       Studyarea.find(function (err, studyareas) {
        if(err) { return handleError(res, err); }
        return res.json(200, studyareas);
      }).populate('responses default_audit_type').exec();

  //filter by is_public field
  }else{
      Studyarea.find({"is_public":req.param('is_public')}, function (err, studyareas) {
        if(err) { return handleError(res, err); }
        return res.json(200, studyareas);
      }).populate('responses default_audit_type').exec();
    }

};

// Get a single studyarea
exports.show = function(req, res) {
  Studyarea.findById(req.params.id, function (err, studyarea) {
    if(err) { return handleError(res, err); }
    if(!studyarea) { return res.send(404); }
  
  }).populate('responses default_audit_type').exec(function(err,data){

    if (err) return handleError(err);
    //res.json(data);

    //populate sub sub document 'question'
    var options = {
      path: 'default_audit_type.questions.question',
      model: 'Question'
    };

    Question.populate(data, options, function (err, sa) {
     
        var options = {
          path: 'responses.responses.question',
          model: 'Question'
        };

       Question.populate(sa, options, function (err, sa2) {
          res.json(sa);
       });
    });
     /*var options = {
      path: 'responses.responses.question',
      model: 'Question'
    };

    Question.populate(data, options, function (err, sa) {
      
    });*/
  });
};

// Creates a new studyarea in the DB.
exports.create = function(req, res) {

  Studyarea.create(req.body, function(err, studyarea) {
    console.log(err);
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

    if(req.body.default_audit_type._id!=null){
      req.body.default_audit_type=req.body.default_audit_type._id;
    }


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