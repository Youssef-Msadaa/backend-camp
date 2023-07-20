const mongoose = require("mongoose");

const CampTent = mongoose.Schema({
  NumOfPlaces: {
    type: Number,
    required: true,
  },
  _campId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const Tent = mongoose.model("Tent", CampTent);

module.exports = Tent;
