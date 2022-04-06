var express = require("express");
var router = express.Router();
var Controller = require("../controllers/web");

router.get('/home', Controller.home); 
router.get('/home/upload', Controller.uploadfile); 
router.get('/home/search', Controller.search); 

//security
router.get('/security/login', Controller.login); 
router.get('/security/register', Controller.register); 
router.get('/security/changepassword', Controller.changepassword); 
router.get('/security/forgotpassword', Controller.forgotpassword); 
router.get('/security/chanegpassword', Controller.forgotpassword); 
router.get('/security/logout', Controller.logout); 
router.get('/profile', Controller.profile); 

module.exports = router;