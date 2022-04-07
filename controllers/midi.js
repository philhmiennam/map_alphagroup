let jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    var token = req.cookies.auth;
  
    if (token) {
      jwt.verify(token, process.env.accsess_token_secret, (err, authData) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.authData = authData;
          next();
        }
      });
    } else {
      return res.json({
        success: 99,
        message: 'Auth token is not supplied'
      });
    }
  };
  
  module.exports = {
    checkToken: checkToken
  }
  