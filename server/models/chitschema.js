const mongoose = require('mongoose');

const chitSchema = new mongoose.Schema({
  id:Number,
  ChitName: String,
  GroupName: String,
  DueType: String,

});

const ChitModel = mongoose.model('ChitModel', chitSchema);

module.exports = ChitModel;
