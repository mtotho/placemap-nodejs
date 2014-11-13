'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AuditTypeSchema = new Schema({
  name: String,
  description: String,
  questions:
  [
  	{
  		order:Number,
  		question:{type: Schema.ObjectId, ref:'Question'}
  	}
  ],
  creator:{type: Schema.ObjectId, ref:'User'}
});

module.exports = mongoose.model('AuditType', AuditTypeSchema);