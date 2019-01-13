const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Poi = new Schema({
  name: {
    type: String //景点名称
  },
  province: {
    type: String
  },
  city: {
    type: String
  },
  county: {
    type: String
  },
  areaCode: {
    type: String
  },
  tel: {
    type: String
  },
  area: {
    type: String
  },
  addr: {
    type: String
  },
  type: {
    type: String
  },
  module: {
    type: String
  },
  longtide: {
    type: Number
  },
  latitude: {
    type: Number
  }
});
module.exports = mongoose.model("Poi", Poi);
