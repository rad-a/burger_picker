const connection = require("./connection.js");
const e = require("express");

// Helper function for SQL syntax.
// Creates an array of question marks and turns it into a string
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    let arr = [];
  
    // loop through the keys and push the key/value as a string into arr
    for (let key in ob) {
      let value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }


const orm = {
  selectAll: function (whatToSelect, tableInput) {
    const queryString = "SELECT ?? FROM ??";
    connection.query(queryString, [whatToSelect, tableInput], function (
      err,
      result
    ) {
      if (err) throw err;
      console.log(result);
    });
  },
  insertOne: function (table, cols, vals, cb) {
    const queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function (err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  updateOne: function (table, objColVals, condition, cb) {
      const queryString = "UPDATE " + table;

      queryString += " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;

      console.log(queryString);
      connection.query(queryString, function(err, result) {
          if (err) {
              throw err;
          } 
          cb(result);
      });
  },

  deleteOne: function (table, condition, cb) {
      const queryString = "DELETE FROM " + table;

      queryString += " WHERE ";
      queryString += condition;

      connection.query(queryString, function(err, result) {
        if (err) {
            throw err;
        } 
        cb(result);
    });
  },
};


//Export the ORM object for the burger.js model
module.exports = orm;