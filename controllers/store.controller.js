cdcdvar mysql = require('mysql')
var con = require('../mysql-connection')
const shortid = require('shortid')
var md5 = require('md5')

module.exports.index = function (req, res) {
    con.query('SELECT * FROM stores', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./stores/stores', { stores: result});
  });
};
module.exports.viewStore = function(req, res){
  var id = req.params.storeId;
  con.query('SELECT * FROM stores WHERE storeId =?', id, function(err, result){
    res.render('./stores/viewStore', {stores: result});
  })
};

module.exports.storeUsers = function(req, res){
  var id = req.params.storeId;
  con.query('SELECT * FROM users WHERE storeId = ?', id, function (err, result) { 
    if (err) throw err;
    //console.log(result)
    res.render('./users/users', { users: result});
});
};

module.exports.viewUsers = function(req, res){
  var id = req.params.userId;
  con.query('SELECT * FROM users WHERE id = ?', id, function (err, result) { 
  if (err) throw err;
  res.render('./users/viewUser', { users: result});
});
};

module.exports.searchUsers = function(req, res){
  var id = req.params.storeId;
  var q = req.query.q;
  con.query('SELECT * FROM users WHERE storeId = ?', id, function (err, result) { // retrieve data 
    if (err) throw err;
    //console.log(result);
    var matchedUsers = result.filter(function(user){
      return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('./users/users', { users: matchedUsers});
  });
};

module.exports.editUsers = function(req, res){
  var id = req.params.userId; 
  con.query('SELECT * FROM users WHERE id = ?',id, function (err, result){
    if (err) throw err;
    //console.log(result[0].id);
    res.render('./users/editUser', {users : result});
});
};

module.exports.postEditUsers =  function(req, res){
  var storeId = req.params.storeId
  con.query('UPDATE users SET username = ? ,password = ?, name=?, dateofbirth=?, gender=?, phone=?, idcard=?, address=?, datein=?  WHERE id =? ',[req.body.username, md5(req.body.password), req.body.name, req.body.dateofbirth, req.body.gender, req.body.phone, req.body.idcard, req.body.address, req.body.datein, req.params.userId],  function(err, result){
    if (err) throw err;
     res.redirect('/stores/'+ storeId +'/users');
  });
};

module.exports.deleteUsers = function(req, res){
   var userId = req.params.userId;
   var storeId = req.params.storeId
  con.query('DELETE FROM users WHERE id = ?',userId, function (err, result){
    if (err) throw err;
  res.redirect('/stores/'+ storeId +'/users');
 });
};

module.exports.storeProducts = function(req, res){
   con.query('SELECT * FROM products WHERE storeId = ?',req.params.storeId, function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./products/products', { products: result});

  });
};
