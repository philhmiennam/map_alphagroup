//index.js
const express = require("express");
const app = express();
const db = require("./config/connectDB");
require('dotenv').config();
const multer = require('multer');
const jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

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

app.post("/postdemo", verifyToken, (req, res) => {
  jwt.verify(req.token, process.env.accsess_token_secret, (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created...",
        authData
      })
    }
  })
});

function verifyToken(req, res, next) {
  var token = req.cookies.auth;
  console.log(token);
  // const bearHeader = req.headers['authorization'];
  // if (typeof bearHeader !== 'undefined') {
  //   const bearer = bearHeader.split(' ');
  //   const bearerToken = bearer[1];
  //   req.token = bearerToken;
  //   console.log(req.token);
  //   next();
  // } else {
  //   res.sendStatus(403);
  // }
}



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  res.status(404).send({
    error: "Đường dẫn không đúng!"
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