var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
 /* var sql = "INSERT INTO users (id, name, username, password) VALUES ('1', 'Nguyen', 'nguyen268', 'e10adc3949ba59abbe56e057f20f883e')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Chenged");
  });*/
});

module.exports = con;
