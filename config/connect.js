const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/CampingDb")
  .then(() => {
    console.log("connected done with database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
