const router = require("express").Router();
const passport = require("passport");
const conn = require("../config/database");
const User = conn.models.User;

router.post("/login", (req, res) => {
  passport.authenticate("local")(req, res, () => {
    res.json({ loggedIn: true, user: req.user });
  });
});

router.post("/register", (req, res) => {
  if (req.body.password === req.body.cpassword) {
    const newUser = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      username: req.body.username,
    });
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        res.json({ loggedIn: false, err: err.message });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({ loggedIn: true, user: req.user });
        });
      }
    });
  } else {
    res.json({ error: "Password Mismatch" });
  }
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.json({ loggedIn: false, msg: "Successfully Logged Out" });
});

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to the MERN Stack Backend" });
});

router.get("/page", (req, res) => {
  if (!req.isAuthenticated()) {
    res.json({ loggedIn: false });
  } else {
    res.json({ loggedIn: true, user: req.user });
  }
});

module.exports = router;
