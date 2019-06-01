var mongoose = require('mongoose');

var IndustrySchema = new mongoose.Schema({
  id: String,
  industryname: String,
  status: String,
});

module.exports = mongoose.model('Industry', IndustrySchema);