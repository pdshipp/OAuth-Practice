const router = require("express").Router();
const passport = require("passport");

// auth login - this will take us to the login page
router.get("/login", (req, res) => {
  res.render("login");
});

// auth logout
router.get("/logout", (req, res) => {
  //handle with pport
  req.logout();
  res.redirect("/");
});

//auth with spotify
router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: ["user-read-email", "user-read-private"],
    showDialog: true,
  })
);

//callback route for spotify to redirect to
router.get(
  "/spotify/callback",
  passport.authenticate("spotify"),
  (req, res) => {
    res.redirect("/profile");
    //    res.send(req.user);
  }
);

module.exports = router;
