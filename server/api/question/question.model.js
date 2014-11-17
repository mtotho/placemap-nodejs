'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionSchema = new Schema({
  question_text: String,
  question_type: String,
  opts:[
  	{
  		option_text: String,
  		order: Number
  	}
  ],
  is_deleted: Boolean
});

module.exports = mongoose.model('Question', QuestionSchema);