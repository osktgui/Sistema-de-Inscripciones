'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PersonSchema = new Schema({
  fullname: String,
  profile: String,
  proofOfPayment: String,
  companyName: String,
  companyAddress: String,
  ruc: String,
  dni: String,
  email: String,
  cellPhone: String,
  address: String,
  institute: String
});

module.exports = mongoose.model('Person', PersonSchema);
