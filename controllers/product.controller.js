var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.index = function (req, res) {
    con.query('SELECT * FROM products', function (err, result) { // retrieve data 
    if (err) throw err;
    res.render('./products/products', { products: result});

  });
};