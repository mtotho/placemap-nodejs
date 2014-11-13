'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question_text: String,
  question_type: {type: Schema.ObjectId, ref:'QuestionType'},
  is_deleted: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);