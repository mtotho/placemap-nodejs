'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuditTypeSchema = new Schema({
  name: String,
  description: String,
  creator:{type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('AuditType', AuditTypeSchema);