//index.js
const express = require("express");
const app = express();
const db = require("./config/connectDB");
require('dotenv').config();
const multer = require('multer');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

// const port = process.env.PROT || 8080;
const port = 3000;

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static('./public/'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({
  extended: true
}))

// SET STORAGE
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.status(404).send({
    error: "Đường dẫn không đúng!"
  });
});

// catch 401 err Login
app.use(function (req, res, next) {
  res.status(401).send({
    error: "Vui lòng đăng nhập!"
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err)
  // render the error page
  res.status(err.status || 500);
  res.status(500).send({
    error: "Error 500!"
  })
})


app.listen(port, () => {
  console.log(`Project run to port ${port}`)
})