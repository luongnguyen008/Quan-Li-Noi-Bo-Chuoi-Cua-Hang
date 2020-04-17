var mysql = require('mysql');

var con = mysql.createConnection({
  host: "sql12.freemysqlhosting.net",
  user: "sql12333999",
  password: "umNhZIfiIQ",
  database: "sql12333999"
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
