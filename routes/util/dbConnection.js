/*
 * To create database connection
 * @author Sandeep G
 * @since 20200324
 */

exports.initConnection = function (req, res) {
    var mysql = require("mysql");
    var con = mysql.createConnection({
<<<<<<< HEAD
        host: "localhost",
=======
        host: "192.168.1.6",//"localhost:8080",
        port: "8080",
>>>>>>> 8a7a99e8ac7a6ae9b306286af753a4eac367f2e4
        user: "root",
        password: "",
        database: "petneed"
    });

    return con;
};

