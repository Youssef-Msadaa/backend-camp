const express = require("express");

const app = express();
app.use(express.json());

const multer = require("multer");
const campPlace = require("../models/campPlace");
const router = express.Router();

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
const upload = multer({ storage: myStorage });

router.get("/all", (req, res) => {
  campPlace
    .find({})
    .then((allcamps) => {
      res.status(200).send(allcamps);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  campPlace
    .find({ _id: req.params.id })
    .then((allcamps) => {
      res.status(200).send(allcamps);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/create", upload.any("image"), (req, res) => {
  let data = req.body;
  let camp = new campPlace(data);
  camp.image = filename;
  camp
    .save()
    .then((savedCamp) => {
      filename = "";
      res.status(200).send(savedCamp);
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

router.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  campPlace
    .findByIdAndUpdate({ _id: id }, data)
    .then((updatedCamp) => {
      res.status(200).send(updatedCamp);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
