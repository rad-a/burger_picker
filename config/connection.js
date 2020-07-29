const dotenv = require('dotenv');
const express = require('express');
const mysql = require("mysql");
// require("dotenv").config({ path: "/.env" });


dotenv.config();
console.log("Test Data connection.js: "+ process.env.TEST_DATA);

let db_pw = process.env.DB_PASSWORD;
// let test_data = process.env.TEST_DATA;


// console.log("##################" + process.env);

// console.log("********************" + test_data);

//Connecting JawsDB
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: db_pw || "",
    database: "burgers_db" || process.env.DATABASE,
  });
}

connection.connect();
module.exports = connection;
