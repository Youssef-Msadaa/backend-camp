const express = require("express");

const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const tentModel = require("../models/tent");
const multer = require("multer");
const router = express.Router();

//Generate Secret Key

const privateKey = "29244410";
const publicKey = "Key";

//verify Token

verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ msg: "access rejected .......!!!!!" });
  }
  try {
    jwt.verify(token, privateKey);
    next();
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

//Verify Token Admin
verifyTokenAdmin = (req, res, next) => {
  let token = req.headers.authorization;
  let role = req.headers.role;
  if (!token || role != "admin") {
    res.status(400).json({ msg: "access rejected .......!!!!!" });
  }
  try {
    jwt.verify(token, privateKey);
    next();
  } catch (e) {
    res.status(400).json({ msg: e });
  }
};

//Crud Operations

let filename = "";
const myStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let date = Date.now();
    let fl = date + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    filename = fl;
  },
});

router.get("/all", (req, res) => {
  tentModel
    .find({})
    .then((allTents) => {
      res.status(200).send(allTents);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  tentModel
    .find({ _id: req.params.id })
    .then((allTents) => {
      res.status(200).send(allTents);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/getbyid/:tentId/:campId", (req, res) => {
  tentModel
    .find({ _id: req.params.id, _campId: req.params.campId })
    .then((allTents) => {
      res.status(200).send(allTents);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
const upload = multer({ storage: myStorage });
router.post("/create/:campId", upload.any("image"), (req, res) => {
  let id = req.params.campId;
  let data = req.body;
  let tent = new tentModel(data);
  tent._campId = id;
  tent.image = filename;
  tent
    .save()
    .then((savedTent) => {
      res.status(200).send(savedTent);
      filename = fl;
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/del/:id", (req, res) => {
  let id = req.params.id;
  tentModel
    .findByIdAndDelete({ _id: id })
    .then((deletedCamp) => {
      res.status(200).send(deletedCamp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/del/:id", (req, res) => {
  let id = req.params.id;
  campPlace
    .findByIdAndDelete({ _id: id })
    .then((deletedCamp) => {
      res.status(200).send(deletedCamp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/update/:id/:campId", (req, res) => {
  let id = req.params.id;
  let campId = req.params.campId;
  let data = req.body;
  tentModel
    .findByIdAndUpdate({ _campId: campId, _id: id }, data)
    .then((updatedCamp) => {
      res.status(200).send(updatedCamp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
