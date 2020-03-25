/**
 * responsible for managing the user in the system
 * @author Sandeep G
 * @since 20200324
 */

//Global variable declaration
var validateLib = require('./../util/formValidator');
var crud = require('./../util/crud.js');
var responseHandler = require('../util/responseHandler');
var message = require('./../util/message');
var common = require('./../util/common');
var sha1 = require('node-sha1');

/**
 * responsible for signing up/ adding up user in the system
 */
module.exports = {
    signup: function (req, response) {
        var respMessage = new responseHandler(response);

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

        if (!myobj.email || !myobj.passwd) {
            respMessage.fail('Email and password' + message.MANDATORY_FIELD);
        }

        //hashing the password
        myobj.passwd = sha1(myobj.passwd);

        //save in the database
        crud.isExist(common.table.USER, 'email', myobj.email).then((res) => {
            if (!res) {

                crud.create('user', myobj, myObjFilter).then((data) => {
                    respMessage.success(message.ROW_INSERTED);
                }, (err) => {
                    respMessage.fail(err);
                });
            } else {
                respMessage.fail('email ' + message.MANDATORY_FIELD);
            }
        }, (err) => {
            respMessage.failDb(response);
        });
    },

    login: (req, response) => {
        var respMessage = new responseHandler(response);

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
            respMessage.failValidation([validatedArr]);
            return;
        }

        var extraCond = `AND passwd = '${sha1(myobj.passwd)}'`;
        //basic authentication
        crud.isExist(common.table.USER, 'email', myobj.email, extraCond, true).then((res) => {
            console.log(res);
            if (res.length > 0) {

                //save the data in user session
                myobj = {
                    uid: res[0].id,
                    status: 1,
                    token: sha1(res[0].id + 'PETNEED' + Date.now())
                };


                //check if any session is already activated, if yes then de-activate
                let sql = `UPDATE ${common.table.USER_SESSION}  
                SET status = 2
                WHERE (uid IN (SELECT uid FROM ${common.table.USER_SESSION} WHERE uid = ${myobj.uid} AND status = 1))`;

                crud.custom(sql).then(() => {
                    //insert session logs
                    crud.create(common.table.USER_SESSION, myobj, false).then(() => {
                        let userDetail = res[0];
                        respMessage.success("logged in successful", { ...myobj, userDetail });
                        return;
                    }, () => {
                        respMessage.failDb();
                    });
                }, () => {
                    respMessage.failDb();
                });
            } else {
                respMessage.fail(message.INVALID_CREDENTIALS);
            }
        }, () => {
            respMessage.failDb();
        });
    }
}