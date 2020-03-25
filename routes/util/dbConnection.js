/*
 * To create database connection
 * @author Sandeep G
 * @since 20200324
 */

exports.initConnection = function (req, res) {
    var mysql = require("mysql");
    var con = mysql.createConnection({
        host: "localhost:8080",
        user: "root",
        password: "",
        database: "petneed"
    });

    return con;
};

