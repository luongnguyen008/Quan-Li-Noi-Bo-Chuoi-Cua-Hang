var mysql = require('mysql')
var con = require('../mysql-connection')
var Cart = require('../models/cart');

module.exports.index = function (req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 4;
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

