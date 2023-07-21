const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
app.use(express.json());

const UserModel = require("../models/user");

//Generate Secret Key
const privateKey = "29244410";
const publicKey = "Key";
const router = express.Router();

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

router.get("/all", (req, res) => {
  UserModel.find({})
    .then((allUsers) => {
      res.status(200).send(allUsers);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.get("/getbyid/:id", (req, res) => {
  UserModel.find({ _id: req.params.id })
    .then((allUsers) => {
      res.status(200).send(allUsers);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/register", (req, res) => {
  let data = req.body;
  let User = new UserModel(data);
  let salt = bcrypt.genSaltSync(10);
  User.password = bcrypt.hashSync(data.password, salt);
  User.save()
    .then((savedUser) => {
      res.status(200).send(savedUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.post("/login", (req, res) => {
  let data = req.body;
  UserModel.findOne({ email: data.email })
    .then((User) => {
      let valid = bcrypt.compareSync(data.password, User.password);
      if (!valid) {
        res.send("email or password invalid");
      } else {
        let payload = {
          _id: User.id,
          fullname: User.firstName + " " + User.lastName,
          email: User.email,
        };
        let token = jwt.sign(payload, "1234567");
        res.send({ mytoken: token });
      }
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.delete("/del/:id", (req, res) => {
  let id = req.params.id;
  UserModel.findByIdAndDelete({ _id: id })
    .then((deletedUser) => {
      res.status(200).send(deletedUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

router.put("/update/:id", (req, res) => {
  let id = req.params.id;
  let data = req.body;
  UserModel.findByIdAndUpdate({ _id: id }, data)
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

module.exports = router;
