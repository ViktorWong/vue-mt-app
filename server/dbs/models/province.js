const mongoose = require("mongoose");
const provinceSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  value: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Province',provinceSchema)
