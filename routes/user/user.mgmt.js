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
var validateLib = require('./../util/formValidator');
var crud = require('./../util/crud.js');

/**
 * responsible for signing up/ adding up user in the system
 */
module.exports = {
    signup: function (req, response) {
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
            email: ['is_empty', 'isEmail'],
            phone: ['is_empty'],
            passwd: ['is_empty', 'isPassword'],
            address: ['is_empty'],
            country: ['is_empty']
        }

        if (!myobj.email) {
            response.send({
                status: false,
                msg: "email id is a mandatory field"
            });
        }

        //save in the database
        crud.isExist('user', 'email', myobj.email).then((res) => {
            if (!res) {

                crud.create('user', myobj, myObjFilter).then((data) => {
                    response.send({
                        status: true,
                        msg: '1 row inserted'
                    });
                }, (err) => {
                    console.log(err);
                    response.send(err);
                });
            } else {
                response.send(JSON.stringify({
                    status: false,
                    msg: "email already exists"
                }));
            }
        }, (err) => {
            console.log(err);
        });
    },

    login: (req, response) => {

        /* validating the data */
        var myobj = {
            email: req.body.email,
            passwd: req.body.passwd,
        }

        var myObjFilter = {
            email: ['is_empty', 'isEmail'],
            passwd: ['is_empty']
        }

        //basic checks
        var validatedArr = validateLib.validate(myobj, myObjFilter);
        if (Object.keys(validatedArr).length != 0) {
            response.send(JSON.stringify({
                status: false,
                message: "Enter all information",
                data: [validatedArr]
            }));
            return;
        }

        var extraCond = `AND passwd = ${myobj.passwd}`;
        crud.isExist('user', 'email', myobj.email, extraCond).then((res) => {
            if (res) {
                response.send(JSON.stringify({
                    status: true,
                    msg: 'logged in successful'
                }));
            } else {
                response.send("Fail");
            }
        }, () => {
            response.send("Fail");
        });
    }
}