var mysql = require('mysql');
var con = require('../mysql-connection');
const shortid = require('shortid');
var md5 = require('md5');


module.exports.index = function (req, res) {
    con.query('SELECT * FROM users', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./users/users', { users: result});
  });
};

module.exports.listUsers = function(req, res){
  con.query('SELECT * FROM users', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./users/listUsers', { users: result});
  });
};
module.exports.listSalary = function(req,res){
  con.query('SELECT salary.id,salary.idSalary, salary.salary, salary.dateStart, salary.dateFinal, users.id, users.name, users.role, users.dateofbirth, users.gender FROM salary,users WHERE salary.id = users.id AND users.role = 1', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./users/listSalary', { users: result});
  });
}

module.exports.calculateSalary = function(req, res){
  con.query('SELECT * FROM users', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./users/calculateSalary', { users: result});
  });
};

module.exports.postCalculateSalary = function(req, res){
  con.query('SELECT * FROM users WHERE role = 1 ', function (err, result) { 
    console.log(req.body.dateStart)

        var x =  req.body.dateStart.slice(0, 4);
        var y =  req.body.dateStart.slice(5, 7);
        var  z =  req.body.dateStart.slice(8,10);
        var  start = new Date();

        start.setDate(z);
        start.setMonth(y-1);
        start.setFullYear(x);
        var date = new Date(start);
        start = date.getTime();       //lấy minigiay của date start
  
        var x1 =  req.body.dateFinal.slice(0, 4);
        var y1 =  req.body.dateFinal.slice(5, 7);
        var  z1 =  req.body.dateFinal.slice(8,10);
        var final = new Date();
              
        final.setDate(z1);
        final.setMonth(y1-1);
        final.setFullYear(x1);
        var final = new Date(final);
        final = final.getTime();         //lấy minigiay của date final
   
        var numberDay = final - start;
        numberDay = numberDay/(86400000)    // số ngày trong khoảng tính
   for (var i = 0; i < result.length; i++) { 
    var idSalary = shortid.generate();
        var salary = numberDay*230000 + result[i].coefficients*950000;
    var values = [
          idSalary,
          result[i].id, 
          salary,
          numberDay,
          req.body.dateStart,
          req.body.dateFinal
    ];
     con.query('INSERT INTO salary (idSalary, id, salary,workDay, dateStart, dateFinal) VALUES (?)',[values], function(err, result){
          if(err) throw err;
            console.log("1 record inserted"); //checked
        });
   }
  res.redirect('/users/listSalary')// update added dream
  });
};

module.exports.editSalary = function(req, res){
  con.query('SELECT * FROM salary WHERE idSalary=?',req.params.idSalary, function (err, result) { 
    if (err) throw err;
    res.render('./users/editSalary', { users: result});
});
};
module.exports.postEditSalary = function(req, res){
    con.query('SELECT * FROM salary WHERE idSalary=?',req.params.idSalary, function (err, result) { 
  console.log(result[0].workDay);
  var workDay = result[0].workDay - req.body.dateOff ;
  var salary = result[0].salary - req.body.dateOff*230000;
  con.query('UPDATE salary SET workDay=?, salary=?  WHERE idSalary=? ',[workDay, salary, req.params.idSalary],  function(err, result){
    if (err) throw err;
  });
});
    res.redirect('/users/listSalary');
};

module.exports.searchSalary = function(req, res){
  var q = req.query.q;

  con.query('SELECT salary.id,salary.idSalary, salary.salary, salary.dateStart, salary.dateFinal, users.id, users.name, users.role, users.dateofbirth, users.gender FROM salary,users WHERE salary.id = users.id AND users.role = 1', function (err, result) {
    if (err) throw err;
    //console.log(result);
    for (var i = 0; i < result.length; i++) {
     result[i].dateStart =  result[i].dateStart.slice(5, 7);
    console.log(result[i].dateStart);
  }
    var matchedSalary = result.filter(function(salary){
      return salary.dateStart.indexOf(q) !== -1;  
    });
    res.render('./users/listSalary', { users: matchedSalary});
  });
};

module.exports.create = function (req, res) {
   res.render('./users/create')
};

module.exports.postCreate = function (req, res) {
  var errors = [];
  var role = 1;
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
          req.body.storeId,
          role
    ]; // create an array that include user inputs 
     console.log(req.body);
    con.query('SELECT * FROM users WHERE username = ? ',req.body.username, function(err, result){

     console.log(result[0]);
     if(result[0] == null){

      con.query('INSERT INTO users (id, username, password, name, dateofbirth, gender, phone, idcard, address, datein, storeId, role) VALUES (?)',[values], function(err, result){
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
  
