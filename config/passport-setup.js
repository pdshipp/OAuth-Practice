const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;

passport.use(
  new SpotifyStrategy({
    //options for the strat
  }),
  () => {
    // passport callback function
  }
);
