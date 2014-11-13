'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudyareaSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Studyarea', StudyareaSchema);