const router = require("express").Router();
const passport = require("passport");
const conn = require("../config/database");
const User = conn.models.User;

router.post("/login", (req, res) => {
  User.find({ username: req.body.username }).then((doc) => {
    if (doc[0]) {
      passport.authenticate("local")(req, res, () => {
        res.json({
          loggedIn: true,
          msg: "Successfully Logged In!",
          user: req.user,
        });
      });
    } else {
      res.json({
        loggedIn: false,
        msg: "Email doesn't exist!",
      });
    }
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
        res.json({
          loggedIn: false,
          msg: "Email doesn't exist!",
        });
      } else {
        passport.authenticate("local")(req, res, () => {
          res.json({
            loggedIn: true,
            msg: "Registration Successful!",
            user: req.user,
          });
        });
      }
    });
  } else {
    res.json({
      loggedIn: false,
      msg: "Password Mismatch!",
    });
  }
});

router.post("/logout", (req, res) => {
  req.logOut();
  res.json({ loggedIn: false, msg: "Successfully Logged Out!" });
});

router.get("/", (req, res) => {
  res.json({ msg: "Welcome to the MERN Stack Backend" });
});

router.get("/user", (req, res) => {
  if (!req.isAuthenticated()) {
    res.json({ loggedIn: false });
  } else {
    res.json({ loggedIn: true, user: req.user });
  }
});

module.exports = router;
