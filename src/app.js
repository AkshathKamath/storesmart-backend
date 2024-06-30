const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

//Setting views dir
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//Serving images (temporary)
app.use(express.static(path.join(__dirname, "../public")));

//To parse url encoded form data
app.use(express.urlencoded({ extended: true }));

//--------------------Routes-------------------------//

//Importing Routes
const homeRouter = require("./routes/home");
const formRouter = require("./routes/analytics_form");
const analyticsRouter = require("./routes/analytics_handling");

//Using Routes
app.use("/", homeRouter); // Root path
app.use("/analytics/form", formRouter); //General analytics and form path
app.use("/analytics", analyticsRouter); //To handle form submission

//--------------------Routes-------------------------//

//Handling Errors
app.use((req, res, next) => {
  res.status(404).render("handle_errors", {
    status: 404,
    message: "Page Not Found",
    error:
      "The page you are looking for does not exist! Please enter a valid URL.",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render("handle_errors", {
    status: 500,
    message: "Internal Server Error",
    error: err.message,
  });
});

module.exports = app;
