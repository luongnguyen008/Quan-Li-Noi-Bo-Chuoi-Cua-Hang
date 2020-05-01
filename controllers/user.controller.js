var mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
var md5 = require('md5')


module.exports.index = function (req, res) {
    con.query('SELECT * FROM users', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./users/users', { users: result});
  });
};
module.exports.create = function (req, res) {
  res.render('./users/create')
};

module.exports.postCreate = function (req, res) {
  req.body.id = shortid.generate(); //generate random id
  var values = [
        req.body.id, 
        req.body.username, 
        md5(req.body.password),
        req.body.name, 
        req.body.dateofbirth,
        req.body.gender,
        req.body.phone,
        req.body.idcard,
        req.body.address,
        req.body.datein,
        req.body.storeId
  ]; // create an array that include user inputs 
  console.log(req.body) //test
    con.query('INSERT INTO users (id, username, password, name, dateofbirth, gender, phone, idcard, address, datein, storeId) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  res.redirect('/users')// update added dream
};


