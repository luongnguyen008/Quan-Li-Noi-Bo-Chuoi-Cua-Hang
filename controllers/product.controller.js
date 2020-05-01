var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.index = function (req, res) {
	var userId = req.signedCookies.userId;
	con.query('SELECT * FROM users WHERE id = ?',userId, function (err, result) {
		var storeId = result[0].storeId;
    	con.query('SELECT * FROM products WHERE storeId = ?',storeId, function (err, result) { // retrieve data 
    		if (err) throw err;
    		res.render('./products/staffProducts', { products: result});
  });
});
};