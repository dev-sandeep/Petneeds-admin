/**
 * All the routes goes here
 * @author Sandeep G
 * @since 20200324
 */
app = require('../app');

global.data = {
    baseUrl: 'localhost:3001',
    table: {
        user: 'user',
    }
}

var userMgmt = require('./user/user.mgmt');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.post("/signup", userMgmt.signup);
app.post("/login", userMgmt.login);
app.post("/", userMgmt.login);

return;












var userMgmt = require('./user/user.mgmt');

global.baseUrl = "mongodb://localhost:27017/";
global.data = {
    table: {
        brand: 'brand',
    }
}
url = global.baseUrl;
global.isDev = true;

/*****************************************************************
 * The Amazing Authentication Process!
 * 1. check the token
 * 1a. token expired(5 mins) > logout process
 * 1b. token invalidate/not exists > return false
 * 1c. token valid > next()
 *****************************************************************/

/**
 * In this section we will do the basic authentication processes
 * @todo: basic authentication process, GET, DETAILS
 */
app.delete("/*", function (req, res, next) {

    if (global.isDev) {
        next();
        return;
    }

    var userAuth = require('./util/userAuthentication.js');
    userAuth.userAuthentication(req).then(function (res) {
        console.log("auth");
        next();

    }, function (err) {//DB or technical error
        console.log('Caught an error!', err);
        return;
    });
    // next();
});

app.post("/*", function (req, res, next) {

    if (global.isDev) {
        next();
        return;
    }
    /**
     * 1. get the header token(req.header.token)
     * 2. make internal api call, to check token exists && status == 1 && user_permission == 1
     * 3. if(authenticated) > next(); //proceed to actual POST call  
     */
    /* when authenticated */

    var loginUrl = req.url;
    if (loginUrl.indexOf("login") >= 0) {
        console.log("Login");
        next();
    } else {
        console.log("test shop");
        var userAuth = require('./util/userAuthentication.js');
        userAuth.userAuthentication(req).then(function (res) {
            console.log("auth");
            next();

        }, function (err) {//DB or technical error
            res.send(err);

            return;
        });
    }
});

app.get("/*", function (req, res, next) {

    if (global.isDev) {
        next();
        return;
    }
    //  console.log("zzzzzzzzzzzzzzz");
    var userAuth = require('./util/userAuthentication.js');
    userAuth.userAuthentication(req).then(function (res) {
        console.log("auth");
        next();

    }, function (err) {//DB or technical error
        console.log('Caught an error!', err);
        return;
    });
    // next();
});
