/**
 * responsible for managing the user in the system
 * @author Sandeep G
 * @since 20200324
 */

//Global variable declaration
var validateLib = require('./../util/formValidator');
var crud = require('./../util/crud.js');
var respMessage = require('../util/responseHandler');   
var message = require('./../util/message');
var common = require('./../util/common');
/**
 * responsible for signing up/ adding up user in the system
 */
module.exports = {
    signup: function (req, response) {
        respMessage.resp = response;

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
            respMessage.fail('Email '+message.MANDATORY_FIELD);
        }

        //save in the database
        crud.isExist(common.table.USER, 'email', myobj.email).then((res) => {
            if (!res) {

                crud.create('user', myobj, myObjFilter).then((data) => {
                    respMessage.success(message.ROW_INSERTED);
                }, (err) => {
                    respMessage.fail(err);
                });
            } else {
                respMessage.fail('email '+message.MANDATORY_FIELD);
            }
        }, (err) => {
            respMessage.failDb(response);
        });
    },

    login: (req, response) => {
        respMessage.resp = response;

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

        var extraCond = `AND passwd = '${myobj.passwd}'`;
        crud.isExist(common.table.USER, 'email', myobj.email, extraCond).then((res) => {
            if (res) {
                respMessage.success(message.LOGIN_SUCCESSFULL, '');

                //save the data in user session
                crud.create(common.table.USER_SESSION, myobj, myObjFilter).then(()=>{

                }, ()=>{
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