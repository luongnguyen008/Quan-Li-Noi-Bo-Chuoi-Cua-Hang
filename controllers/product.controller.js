var mysql = require('mysql');
var con = require('../mysql-connection');
var Cart = require('../models/cart');
var md5 = require('md5');

module.exports.index = function (req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 6;
	var start = (page -1)* perPage;
	var end = page*perPage;

	var storeId = req.session.storeId;
		con.query('SELECT COUNT(id) AS NumberOfProducts FROM products WHERE storeId=?',storeId, function (err, result) {
			var numberOfProducts= result[0].NumberOfProducts;
			var numberOfPages= Math.ceil(numberOfProducts/perPage)
			//console.log(numberOfPages);
	    	con.query('SELECT * FROM products WHERE storeId = ?',storeId, function (err, result) {
	    		if (err) throw err;
	    		res.render('./products/staffProducts', { products: result.slice(start, end), page, numberOfPages});
	    	});
  		});
};
module.exports.searchProducts = function (req, res) {
	var id = req.params.storeId;
	var q = req.query.q;
	var storeId = req.session.storeId;
	con.query('SELECT * FROM products WHERE storeId = ?', storeId, function (err, result) { // retrieve data 
	    if (err) throw err;
	    console.log(result);
	    var matchedProducts = result.filter(function(product){
	      return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	    });
	    res.render('./products/staffProducts', { products: matchedProducts});
	});
};

module.exports.changePassword = function(req, res){
  res.render('./products/changePassword');
};

module.exports.postChangePassword = function(req, res){
	 var errors = [];
	 var id = req.session.userId
   var oldPassword = md5(req.body.oldPassword);
  var newPassword = md5(req.body.newPassword);
  var confirmPassword = md5(req.body.confirmPassword);
  con.query('SELECT * FROM users WHERE id = ?',id, function (err, result){ 
  var password = result[0].password;

  if(oldPassword.localeCompare(password) ==0 && newPassword.localeCompare(confirmPassword)==0){
  con.query('UPDATE users SET password = ? WHERE id =? ',[newPassword, id],  function(err, result){
    if (err) throw err;
     res.redirect('/products');
  });

  };
     if(oldPassword.localeCompare(password) !=0 && newPassword.localeCompare(confirmPassword)==0){
    errors.push("Old password wrong!!");
    };
    if(newPassword.localeCompare(confirmPassword) !=0 && oldPassword.localeCompare(password) ==0 ){
    errors.push("Cofirm password wrong!!");
    };
    if(newPassword.localeCompare(confirmPassword) !=0 && oldPassword.localeCompare(password) !=0 ){
    errors.push("Old password and confirm Password wrong!!");
    };
    if(newPassword.localeCompare(password) ==0 && oldPassword.localeCompare(password) ==0 && newPassword.localeCompare(confirmPassword) ==0){
    errors.push("You can't use Old Password!!");
    };
    if(errors.length){
        res.render('./products/changePassword', {
      errors: errors,
      values: req.body
    });
    return;
  }


 });



};