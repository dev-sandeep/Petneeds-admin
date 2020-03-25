/**
 * responsible for managing the user in the system
 * @author Sandeep G
 * @since 20200324
 */

//Global variable declaration
var myobj = {};
var uniqid = require('uniqid');
var sha1 = require('node-sha1');
var validator = require('validator');
/**
 * responsible for signing up/ adding up user in the system
 */
exports.signup = function (req, response) {
    var crud = require('./../util/crud.js');


    /* validating the payload */
    var myobj = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        passwd: req.body.passwd,
        address: req.body.address,
        country: req.body.country
    }

    /* check the basic validation */
    var myObjFilter = {
        fname: ['is_empty'],
        lname: ['is_empty'],
        email: ['is_empty'],
        phone: ['is_empty'],
        passwd: ['is_empty', 'isPassword'],
        address: ['is_empty'],
        country: ['is_empty']
    }

    if (!myobj.email) {
        response.send({ status: false, msg: "email id is a mandatory field" });
    }

    //save in the database
    crud.isExist('user', 'email', myobj.email).then((res) => {
        if (!res) {

            crud.create('user', myobj, myObjFilter).then((data) => {
                response.send({ status: true, msg: '1 row inserted' });
            }, (err) => {
                console.log(err);
                response.send(err);
            });
        } else {
            response.send(JSON.stringify({ status: false, msg: "email already exists" }));
        }
    }, (err) => {
        console.log(err);
    });
}

exports.login = function (req, response) {
    console.log("login");
    response.end(JSON.stringify(req.body));
}


