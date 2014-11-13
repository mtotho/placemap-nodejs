'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionTypeSchema = new Schema({
  type: String
});

module.exports = mongoose.model('QuestionType', QuestionTypeSchema);