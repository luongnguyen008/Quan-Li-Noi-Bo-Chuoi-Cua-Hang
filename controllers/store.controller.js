var mysql = require('mysql');
var con = require('../mysql-connection');
const shortid = require('shortid');
var md5 = require('md5');

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
    console.log(result[0].picture);
    res.render('./products/products', { products: result});

  });
};
module.exports.editStores = function(req, res){
  var id = req.params.storeId; 
  con.query('SELECT * FROM stores WHERE storeId = ?',id, function (err, result){
    if (err) throw err;
    //console.log(result[0].id);
    res.render('./stores/editStore', {stores : result});
});
};


module.exports.postEditStores =  function(req, res){
  var storeId = req.params.storeId
  con.query('UPDATE stores SET storeId = ? ,storeName = ?, storeAddress =?, dateCreate=? WHERE storeId =? ',[req.body.storeId, req.body.storeName, req.body.storeAddress, req.body.dateCreate, req.params.storeId],  function(err, result){
    if (err) throw err;
     res.redirect('/stores');
  });
};
module.exports.createProduct = function (req, res) {
 var storeId = req.params.storeId;
 con.query('SELECT * FROM stores WHERE storeId = ?',storeId, function (err, result){
    if (err) throw err;
  res.render('./products/createProduct', {stores : result});
});
};

module.exports.postCreateProduct = function (req, res) {
 var storeId = req.params.storeId;  
 req.body.picture = req.file.path.split('\\').slice(1).join('/');
 //console.log(req.body.picture);
  var values = [
        req.body.id, 
        req.body.name, 
        req.body.price,
        req.body.quantity,
        req.body.storeId,
        req.body.picture,
  ]; // create an array that include user inputs 
  //console.log(req.body) //test
    con.query('INSERT INTO products (id, name, price, quantity, storeId, picture) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  res.redirect('/stores')// update added dream
};

module.exports.deleteStore = function(req, res){
   var storeId = req.params.storeId; 
  con.query('DELETE FROM stores WHERE storeId = ?',storeId, function (err, result){
    if (err) throw err;
  res.redirect('/stores');
 });
};

module.exports.createStore = function (req, res) {
  res.render('./stores/createStore')
};

module.exports.postCreateStore = function (req, res) {
  var errors = [];
  if(!req.body.storeId){
    errors.push("Store ID is required");
  }
  if(!req.body.storeName){
    errors.push("Name is required");
  }
  if(!req.body.storeAddress){
    errors.push("Address is required");
  }
  if(!req.body.dateCreate){
    errors.push("Date open is required");
  }
  
  if(errors.length){
    res.render('/stores/createStore', {
      errors: errors,
      values: req.body
    });
    return;
  }
  var values = [
  req.body.storeId, 
  req.body.storeName, 
  req.body.storeAddress,
  req.body.dateCreate 
  ]; // create an array that include store inputs 
  console.log(req.body) //test
    con.query('INSERT INTO stores (storeId, storeName, storeAddress, dateCreate) VALUES (?)',[values], function(err, result){
        if(err) throw err;
            console.log("1 record inserted"); //checked
        });
  res.redirect('/stores')// update added dream
};

module.exports.searchProducts = function(req, res){
  var id = req.params.storeId;
  var q = req.query.q;
  con.query('SELECT * FROM products WHERE storeId = ?', id, function (err, result) { // retrieve data 
    if (err) throw err;
    //console.log(result);
    var matchedProducts = result.filter(function(products){
      return products.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('./products/products', { products: matchedProducts});
  });
};

module.exports.editProducts = function(req, res){
  var id = req.params.id
  con.query('SELECT * FROM products WHERE id = ?',id, function (err, result){
    if (err) throw err;
    //console.log(result[0].id);
    res.render('./products/editProduct', {products : result});
});
};


module.exports.postEditProducts =  function(req, res){
  var storeId = req.params.storeId
  con.query('UPDATE products SET id = ? ,name = ?, price =?, quantity=?, storeId=? WHERE id =? ',[req.body.id, req.body.name, req.body.price, req.body.quantity,req.body.storeId, req.params.id],  function(err, result){
    if (err) throw err;
    console.log( req.body);
     res.redirect('/stores/'+ storeId +'/products');
  });
};
module.exports.deleteProducts = function(req, res){
   var id = req.params.id;
   var storeId = req.params.storeId
  con.query('DELETE FROM products WHERE id = ?',id, function (err, result){
    if (err) throw err;
  res.redirect('/stores/'+ storeId +'/products');
 });
};

