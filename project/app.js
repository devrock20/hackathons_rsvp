//require modules
const express = require("express");
const morgan = require("morgan");
const methodOverdie = require("method-override");
const hackthonRoutes = require("./routes/hackthonRoutes");
const mainRoutes = require("./routes/mainRoutes");

//create application
const app = express();

//configure app
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

//mount middleware functions
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(methodOverdie("_method"));

//main routes
app.use("/", mainRoutes);

app.use("/hackathons", hackthonRoutes);

app.use((req, res, next) => {
  let err = new Error("The server cannot locate " + req.url);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  if (!err.status) {
    err.status = 500;
    err.message = "Internal Server Error";
  }
  res.status(err.status);
  res.render("error", { error: err });
});

//start the server
app.listen(port, host, () => {
  console.log("server is running on port", port);
});
