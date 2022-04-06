const pool = require("../config/connectDB");
const express = require("express");
const router = express.Router();
const Controller = require("../controllers/api");
const multer = require('multer');
const logout = require('express-passport-logout');
const bodyParser = require('body-parser');
var cookies = require("cookie-parser");

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const upload = multer({
    storage: storage
});

const app = express();

//CREATE EXPRESS APP
app.use(bodyParser.urlencoded({
    extended: true
}))

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

router.post('/login', Controller.DEMOLOGIN);
router.get('/logout', Controller.logout);

router.get('/map-getAll', verifyToken, Controller.getAllListMap_filter);

router.get('/item-map/:id', verifyToken, Controller.getItemMapWithId);
router.post('/create-data-map', Controller.createDataMap);

//upload file
router.post('/uploadfile', upload.single('file'), Controller.postUploadFile);

//-------------- API Address -------------
//api get all province
router.get('/province/get-all', Controller.getListProvince);

//api get all District
router.get('/district/get-all', Controller.getListDistrict);
//--api get District With id Province
router.get('/district/getWithId/:id', Controller.getDistrictWithId);

//api get all Commnune
router.get('/commune/get-all', Controller.getListCommune);
//--api get commune With id district
router.get('/commune/getWithId/:id', Controller.getCommnuneWithId);

//-------------- API TypeMap -------------
router.get('/type-map/get-all', Controller.getListTypeMap);

router.get('/getItemTileset/:id', Controller.getItemMapWithTileSet);


function verifyToken(req, res, next) {
    var token = req;
    console.log(token);
    if (token != null) {
        req.token = token;
        next();
    } else {
        res.sendStatus(403);
        return res.redirect('/security/login');
    }
}

module.exports = router;