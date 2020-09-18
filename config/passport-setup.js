const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../credentials");
const User = require("../models/user-model");

// might need to edi
passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.SPOTIFY.clientID,
      clientSecret: keys.SPOTIFY.clientSecret,
      callbackURL: "http://localhost:3000/auth/spotify/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      //check if user already exists in database
      User.findOne({ username: profile.username }).then((currentUser) => {
        if (currentUser) {
          console.log(`User is: ${currentUser}`);
        } else {
          new User({
            username: profile.username,
            profileUrl: profile.profileUrl,
            email: profile._json.email,
          })
            .save()
            .then((newUser) => {
              console.log("new user created: " + newUser);
            });
        }
      });
    }
  )
);
