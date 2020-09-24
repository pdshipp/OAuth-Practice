const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const keys = require("../credentials");
const User = require("../models/user-model");
const { request } = require("express");

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
      console.log(profile);
      User.findOne({ username: profile.username }).then((currentUser) => {
        if (currentUser) {
          currentUser.accesstoken = accessToken;
          currentUser.refreshtoken = refreshToken;
          currentUser.save().then((currentUser) => {
            console.log(
              `${currentUser} already exists, Access Token refreshed.`
            );
            done(null, currentUser);
          });
        } else {
          new User({
            username: profile.username,
            profileUrl: profile.profileUrl,
            email: profile._json.email,
            accesstoken: accessToken,
            refreshtoken: refreshToken,
            thumbnail: profile.photos[0],
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
