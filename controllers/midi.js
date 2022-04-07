let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
  var token = req.cookies.auth;
  console.log('chhhdhhdhd', token);
  if (!token) {
    req.checkLogin = true;
  } else {
    req.checkLogin = false;
  }

};

module.exports = {
  checkToken: checkToken
}