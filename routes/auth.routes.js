const router = require("express").Router();

// auth login - this will take us to the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
  //handle with pport
  res.send("logging out");
});

//auth with spotify
router.get("/spotify", (req, res) => {
  //handle with pport
  res.send("logging in with Spotify");
});

module.exports = router;
