const express = require("express");
const authRoutes = require("./routes/auth.routes");
const app = express();
const passportSetup = require("./config/passport-setup");
const keys = require("./credentials");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");

// set up view engine
app.set("view engine", "ejs");

//connect to MongoDB
mongoose
  .connect(keys.MONGODB.dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Connected to database");
    },
    (err) => {
      console.log("Error");
    }
  );

// set up routes
app.use("/auth", authRoutes);

//create home route
app.get("/", (req, res) => {
  res.render("home");
});

app.listen(3000, () => {
  console.log("app now listening for requests on port 3000");
});
