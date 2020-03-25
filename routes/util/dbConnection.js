/*
 * To create database connection
 * @author Sandeep G
 * @since 20200324
 */

exports.initConnection = function (req, res) {
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "192.168.1.6",//"localhost:8080",
        port: "8080",
        user: "root",
        password: "",
        database: "petneed"
    });

    return con;
};

