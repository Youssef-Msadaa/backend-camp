const express = require("express");

const cors = require("cors");
require("./config/connect");
const bodyParser = require("body-parser");
const app = express();

// Parse incoming request bodies as JSON
app.use(bodyParser.json());

// Parse incoming request bodies as URL-encoded data (extended: false indicates that the values can be of any type, not just strings)
app.use(bodyParser.urlencoded({ extended: false }));
const allowedOrigins = ["http://localhost:4200"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// Use the CORS middleware
app.use(cors(corsOptions));
app.use("/getimage", express.static("./uploads"));
//Routes
const campPlaceRout = require("./routes/campPlace");
const tentRout = require("./routes/tent");
const UserRout = require("./routes/user");
app.use("/campRout", campPlaceRout);
app.use("/tentRout", tentRout);
app.use("/user", UserRout);
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(3000, () => {
  console.log("server work successufully in port 3000");
});
