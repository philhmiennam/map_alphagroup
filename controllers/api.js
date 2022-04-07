const pool = require("../config/connectDB");
const axios = require('axios');
const AWS = require('aws-sdk');
const jwt = require('jsonwebtoken');
const multer = require('multer');
var express = require('express');
require("dotenv").config();



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({
    storage: storage
});


// *************************** ACCOUNT ******************************
//api GET ALL LIST MAP
let getAllListAccount = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM Account");
    console.log(rows);
    return res.status(200).json({
        map: rows
    })
}
// ********************************************************************
// ************************** CHECK LOGIN *****************************
let DEMOLOGIN = async (req, res) => {
    var {
        username,
        password
    } = req.body;

    const [rows, fields] = await pool.execute(`SELECT * FROM account 
                INNER JOIN role ON account.idrole = role.id 
                WHERE account.username = '${username}' AND account.password = '${password}'`);

    if (rows[0] == null) {
        return res.status(500).json('Kiểm tra lại thông tin')
    } else {
        if (rows[0].username == username && rows[0].password == password) {
            var token = jwt.sign({
                username: username
            }, process.env.accsess_token_secret);
            // lưu token vào bảng token
            res.cookie('auth', token);
            return res.status(200).json(token)
        } else {
            console.log(">>>check false");
        }
    }
}

let logout = async (req, res) => {
    res.clearCookie('auth');
    return res.redirect('/security/login');
}
//***********************************************************************
// ***************************** TABLE MAP ******************************
//api GET ALL LIST MAP
let getAllListMap = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM MAP");
    console.log(rows);
    return res.status(200).json({
        list: rows
    })
}

//api GET ALL LIST MAP DEMO02
let getAllListMap_filter = async (req, res) => {
    const [rows, fields] = await pool.execute(`SELECT map.id, map.name as namemap, map.status, 
    map.lags, map.lngs, map.zoom, map.description, typemap.name as nametypemap, commune.name as namecommune
    FROM map 
    INNER JOIN commune ON map.idcommune = commune.id
    INNER JOIN typemap ON map.idtypemap = typemap.id
    order by map.createdated`);
    console.log(rows);
    return res.status(200).json({
        map: rows
    })
}

//api get item tileset of list
let getItemMapWithTileSet = async (req, res) => {
    var id_tileset = req.params.id;
    var username = 'philhmiennam24h';
    var token = 'sk.eyJ1IjoicGhpbGhtaWVubmFtMjRoIiwiYSI6ImNsMWcyYTdpZzBkcGYzY3BuM3M4eXM0bTIifQ.M8kcl6d8xHjIGBhNhBLHGQ';
    var token_url = 'https://api.mapbox.com/tilesets/v1/' + username + '/?access_token=' + token;

    var config = {
        method: 'get',
        url: token_url,
        headers: {}
    };

    axios(config)
        .then(function (response) {
            var data = JSON.parse(JSON.stringify(response.data));
            var item = data.find(item => item.id == id_tileset);
            return res.status(200).json(item)
        })
        .catch(function (error) {
            console.log(error);
        });
}

//api POST MAP
let createDataMap = async (req, res) => {
    console.log('>>check call create datamap');
    let {
        id,
        name,
        visibility,
        createdated,
        description,
        filesize,
        status,
        zoom,
        lags,
        lngs,
        type,
        idcommune,
        idtypemap
    } = req.body;
    try {
        await pool.execute(`INSERT INTO map (id, name, visibility, createdated, description, filesize,
            status, zoom , type, idcommune, idtypemap,  lags, lngs) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [id,
                name,
                visibility,
                createdated,
                description,
                filesize,
                status,
                zoom,
                type,
                idcommune,
                idtypemap,
                lags,
                lngs
            ])
        return res.status(200).json('ok')
    } catch (error) {
        console.log(error);
    }
}

//api PUT MAP

//api GET Item Map With Id
let getItemMapWithId = async (req, res) => {
    var id = req.params.id;
    console.log(id);
    if (!id) {
        return res.status(500).json({
            message: 'Can not read id'
        })
    }
    const [rows, fields] = await pool.execute(`SELECT map.id, commune.name as namecommune,  map.name as namemap, 
    map.lags, map.lngs, map.zoom,  map.description
    FROM map 
    INNER JOIN commune 
    ON map.idcommune = commune.id    
    WHERE map.id = '${id}'`);
    return res.status(200).json(rows)
} // status 200 --- update...

// *************************** END MAP ********************************

//***************************** ADDRESS *********************************
//******* Province ******* */
//api GET ALL LIST Province
let getListProvince = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM province");
    return res.status(200).json({
        list: rows
    })
} // status 200

//******* District ******* */
//api GET ALL LIST District
let getListDistrict = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM district");
    return res.status(200).json({
        list: JSON.stringify(rows)
    })
} // status 200

//api GET District With id Province
let getDistrictWithId = async (req, res) => {
    var id = req.params.id;
    const [rows, fields] = await pool.execute(`SELECT * from district where idprovince = ${id}`);
    return res.status(200).json({
        list: rows
    })
} // status 200

//******* Commnune ******* */
//api GET ALL LIST Commnune
let getListCommune = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM commune");
    return res.status(200).json({
        list: rows
    })
} // status 200

//api GET Commnune With id district
let getCommnuneWithId = async (req, res) => {
    var id = req.params.id;
    const [rows, fields] = await pool.execute(`SELECT * from commune where iddistrict = ${id}`);
    return res.status(200).json({
        list: rows
    })
} // status 200

// *************************************************************************
//***************************** TypeMap *********************************/
// get all list type map
let getListTypeMap = async (req, res) => {
    const [rows, fields] = await pool.execute("SELECT * FROM typemap");
    return res.status(200).json({
        list: rows
    })
} // status 200

// ******************************* UPLOAD FILE *****************************
let postUploadFile = async (req, res, next) => {
        var buffer_file = req.file.buffer;
        var authData = req.authData;
        console.log(authData);
        // value default
        var username = 'philhmiennam24h';
        var token = process.env.token;
        console.log(token, username);
        var token_url = 'https://api.mapbox.com/uploads/v1/' + username + '/credentials?access_token=' + token;
        var url_postMapbox = 'https://api.mapbox.com/uploads/v1/' + username + '?access_token=' + token;

        //post s2
        var region = 'us-east-1';
        var environment = [];

        var config_s3 = {
            method: 'post',
            url: token_url,
            headers: {}
        };


        axios(config_s3).then(function (response) {
            console.log(JSON.stringify(response.data));
            // environment = JSON.parse(JSON.stringify(response.data));
            // console.log('>>>check2');
            // try {
            //     // setting config
            //     const s3 = new AWS.S3({
            //         accessKeyId: environment.accessKeyId,
            //         secretAccessKey: environment.secretAccessKey,
            //         sessionToken: environment.sessionToken,
            //         region: region
            //     })

            //     let uploadParams = {
            //         Key: environment.key,
            //         Bucket: environment.bucket,
            //         Body: buffer_file
            //     }
            //     console.log('>>>check 3');
            //     //put file in amazon s3
            //     s3.putObject(uploadParams).promise().then(response => {
            //         //Post mapbox
            //         console.log('>>>check 4');
            //         const tilesets = `${username}.${req.file.originalname.split(".")[0]}`;
            //         const filename = `${Date.now()}-${req.file.originalname.split(".")[0]}`;
            //         var data = JSON.stringify({
            //             "tileset": tilesets,
            //             "url": environment.url,
            //             "name": filename
            //         });

            //         var config_mapbox = {
            //             method: 'post',
            //             url: url_postMapbox,
            //             headers: {
            //                 'Content-Type': 'application/json'
            //             },
            //             data: data
            //         };

            //         axios(config_mapbox)
            //             .then(function (response) { //*************
            //                 console.log('>>>check 5');
            //                 return res.status(200).json(response.data);
            //             })
            //             .catch(function (error) {
            //                 return res.status(500).json({
            //                     error: 'Reload file!' + error,
            //                     message: 'false'
            //                 });
            //             });
            //     });
            // } catch (error) {
            //     return res.status(500).json({
            //         error: 'Reload file!' + error
            //     });
            // }
        }).catch(function (error) {
            return res.status(500).json(error);
        });
} // status 200



//exports
module.exports = {
    postUploadFile,

    getAllListAccount,
    DEMOLOGIN,
    logout,

    getAllListMap,
    getAllListMap_filter,
    createDataMap,
    getItemMapWithId,
    getItemMapWithTileSet,

    getListProvince,

    getListDistrict,
    getDistrictWithId,

    getListCommune,
    getCommnuneWithId,

    getListTypeMap
}