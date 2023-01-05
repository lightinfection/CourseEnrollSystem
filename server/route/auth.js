const router = require("express").Router();
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const User = require("../models").usermodel;
const Jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming to auth.js \n");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "testAPI is working",
  };
  return res.json(msgObj);
});

router.post("/register", async (req, res) => {
  let { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let emailexist = await User.findOne({ email: req.body.email });
  if (emailexist) return res.status(400).send("Email has already existed.");
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.role,
  });
  console.log(newUser);
  try {
    let savedUser = await newUser.save();
    console.log("great");
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    res.status(400).send("user not saved");
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(400).send(err);
    if (!user) {
      return res.status(401).send("The user doesn't exist.");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          let tokenObject = { _id: user._id, email: user.email };
          let token = Jwt.sign(tokenObject, process.env.MYSECRET);
          res.send({ success: true, token: "JWT " + token, user });
        } else {
          return res.status(401).send("Wrong password.");
        }
      });
    }
  });
});

module.exports = router;
