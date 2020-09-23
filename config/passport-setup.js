const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../credentials");
const User = require("../models/user-model");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

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
          done(null, currentUser);
        } else {
          new User({
            username: profile.username,
            profileUrl: profile.profileUrl,
            email: profile._json.email,
            accesstoken: accessToken,
            refreshtoken: refreshToken,
          })
            .save()
            .then((newUser) => {
              console.log("new user created: " + newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);
