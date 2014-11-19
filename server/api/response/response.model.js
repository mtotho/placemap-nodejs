'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ResponseSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  lat: String,
  lng: String,
  icon:String,
  responses:[
  	{	
      text:String,
      opts:[String],
  		question:{type: Schema.ObjectId, ref:'Question'}
  	}
  ],
  audit_type:{type: Schema.ObjectId, ref:'AuditType'}
  
});

module.exports = mongoose.model('Response', ResponseSchema);