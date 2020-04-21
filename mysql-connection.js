var mysql = require('mysql');

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "e95UAjQLoi",
  password: "V5qDiUSVge",
  database: "e95UAjQLoi"
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
