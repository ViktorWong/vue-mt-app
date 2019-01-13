const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  menu:{
    type:Array
  }
});

module.exports = mongoose.model('Menu',menuSchema)
