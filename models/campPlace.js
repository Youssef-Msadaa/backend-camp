const mongoose = require("mongoose");

const CampPl = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    minlength: 8,
  },
  image: {
    type: String,
  },
  localPos: {
    type: String,
    required: true,
  },
});

const campPlace = mongoose.model("campPlace", CampPl);

module.exports = campPlace;
