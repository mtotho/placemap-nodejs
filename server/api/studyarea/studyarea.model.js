'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StudyareaSchema = new Schema({
  name: String,
  lat: String,
  lng: String,
  default_zoom: Number,
  timestamp: { type: Date, default: Date.now },
  default_audit_type: {type: Schema.ObjectId, ref:'AuditType'},
  responses:[{type: Schema.ObjectId, ref:'Response'}],
  is_public: Boolean
});

module.exports = mongoose.model('Studyarea', StudyareaSchema);