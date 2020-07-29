require("dotenv").config();
const express = require("express");
const mysql = require("mysql");

let db_pw = process.env.DB_PASSWORD;

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
