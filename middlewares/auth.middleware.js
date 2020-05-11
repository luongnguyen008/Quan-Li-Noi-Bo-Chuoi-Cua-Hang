var mysql = require('mysql')
var con = require('../mysql-connection')

module.exports.requireAuth = function (req, res, next){
	if(!req.session.userId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM users WHERE id = ?', req.session.userId, function (err, result) { 
  		if (err) throw err;
  		if(!result[0]){
  			res.redirect('/auth/login');
  		}
  		res.locals.user = result[0];
  		next()
	});
};
module.exports.adminAuth = function (req, res, next){
	if(!req.session.userId){
		res.redirect('/auth/login');
		return;
	}
	con.query('SELECT * FROM users WHERE id = ?', req.session.userId, function (err, result) { 
  		if (err) throw err;
		if (result[0].username.localeCompare("admin")!== 0){
			res.redirect('/products')
	}
	res.locals.user = result[0];
	next()
	});
};