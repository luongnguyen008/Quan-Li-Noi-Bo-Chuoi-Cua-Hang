var mysql = require('mysql');

var con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "0971339759",
  database: "database"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  /*var sql = "DELETE FROM users";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Chenged");
  });*/
});

module.exports = con;