const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../credentials");

// might need to edi
passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.SPOTIFY.clientID,
      clientSecret: keys.SPOTIFY.clientSecret,
      callbackURL: "http://localhost:3000/auth/spotify/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      console.log("pport firrreee");
      console.log(profile);
    }
  )
);
