'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResponseSchema = new Schema({
  timestamp: Date,
  lat: String,
  lng: String,
  question_responses:[
  	{	
  		response:String,
  		question:{type: Schema.ObjectId, ref:'Question'}
  	}
  ],
  audit_type:{type: Schema.ObjectId, ref:'AuditType'}
  
});

module.exports = mongoose.model('Response', ResponseSchema);