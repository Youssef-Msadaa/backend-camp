const express = require("express");

const cors = require("cors");
require("./config/connect");
const app = express();
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(cors());
app.use("/getimage", express.static("./uploads"));
//Routes
const campPlaceRout = require("./routes/campPlace");
const tentRout = require("./routes/tent");
app.use("/campRout", campPlaceRout);
app.use("/tentRout", tentRout);

app.listen(3000, () => {
  console.log("server work successufully in port 3000");
});
