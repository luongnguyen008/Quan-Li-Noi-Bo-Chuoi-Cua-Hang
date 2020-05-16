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
  var errors = [];
  req.body.id = shortid.generate(); //generate random id
  var usern;
  var date = new Date();
  var year = date.getFullYear().toString();
  var month = (date.getMonth() + 101).toString().substring(1);
  var day = (date.getDate() + 100).toString().substring(1);
  datein = day + '/' + month + '/' + year;

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
          datein,
          req.body.storeId
    ]; // create an array that include user inputs 
     console.log(req.body);
    con.query('SELECT * FROM users WHERE username = ? ',req.body.username, function(err, result){

     console.log(result[0]);
     if(result[0] == null){

      con.query('INSERT INTO users (id, username, password, name, dateofbirth, gender, phone, idcard, address, datein, storeId) VALUES (?)',[values], function(err, result){
          if(err) throw err;
            console.log("1 record inserted"); //checked
        });
        res.redirect('/users')// update added dream
      };
      
      if(result[0]){
        errors.push("username đã có người dùng!!");
      };
       
      if(errors.length){
           res.render('./users/create', {
      errors: errors,
      values: req.body
    });
    return;
  };
});
};
  
