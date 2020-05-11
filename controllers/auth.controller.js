var mysql = require('mysql');
var con = require('../mysql-connection')
var md5 = require('md5')


module.exports.login = function (req, res, next) {
	res.render('auth/login');
};
module.exports.postLogin = function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	con.query('SELECT * FROM users WHERE username = ?',[username], function (err, result) { //result trả về 1 array chứa object
		//console.log(typeof result[0].username)
		if (err) throw err;
		if(result[0] === undefined || result[0].username !== username) {
			res.render('auth/login', {
				errors:[
					'UserName Truy Cap Khong Hop Le'
				],
				values: req.body
			});
			return;
		}

		var hashedPassword = md5(password)

		if(result[0].password !== hashedPassword){
			res.render('auth/login', {
				errors:[
					'Wrong password!'
				],
				values: req.body
			});
			return;
		}
		req.session.userId = result[0].id;
		req.session.storeId = result[0].storeId;
		req.session.cart = {};
		//req.session.username = result[0].username;
		console.log(req.session)
		if (result[0].username.localeCompare('admin') === 0){
			res.redirect('/stores');
		}
		if (result[0].username.localeCompare('admin') !== 0){
			res.redirect('/products');
		}
		

});
};