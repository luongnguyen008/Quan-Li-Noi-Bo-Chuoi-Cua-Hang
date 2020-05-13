var mysql = require('mysql')
var con = require('../mysql-connection')
var Cart = require('../models/cart');

module.exports.cartIndex = function(req, res){
	if (!req.session.cart) {
		return res.render('./cart/cart', {
			products: null
		});
	}
	var cart = new Cart(req.session.cart);
	res.render('./cart/cart', {
		products: cart.getItems(),
		totalPrice: cart.totalPrice
	});
};
module.exports.addToCart = function(req, res) {
	var productId = req.params.productId;
	var cart = new Cart(req.session.cart ? req.session.cart : {});
	var storeId = req.session.storeId;
	con.query('SELECT * FROM products WHERE id = ? and storeId = ?',[productId,storeId] , function (err, result) {
		cart.add(result[0], productId);
		req.session.cart = cart;
		//console.log(req.session.cart);
		//console.log(cart.items[productId].item.id)
		res.redirect('/products');
});
};
module.exports.removeFromCart = function(req, res){
	 var productId = req.params.productId;
	 var cart = new Cart(req.session.cart ? req.session.cart : {});
	 cart.remove(productId);
	 req.session.cart = cart;
	 res.redirect('/cart');
};

module.exports.checkOut = function(req, res){
	//console.log(req.session.cart.cartId)
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	var dateTime = date+' '+time;

	var productId = Object.keys(req.session.cart.items);
	var storeId = req.session.storeId;
	var cart = [req.session.cart.cartId, req.session.userId, dateTime, req.session.storeId, req.session.cart.totalPrice]
	con.query('INSERT INTO cart (cartId, userId, orderDate, storeId, total) VALUES (?)', [cart], function(err, result){
		if (err) throw err;
	});
	for (var i =0; i< productId.length; i++){
		var cartDetails = [req.session.cart.cartId, req.session.storeId, productId[i], req.session.cart.items[productId[i]].quantity]
		con.query('INSERT INTO cartDetails (cartId, storeId, productId, quantity) VALUES (?)', [cartDetails], function(err, result){
			if (err) throw err;
		});
	};
	console.log(req.session.cart.cartId)
	for (var i =0; i< productId.length; i++){
		var updatedQuantity = req.session.cart.items[productId[i]].item.quantity - req.session.cart.items[productId[i]].quantity;
		con.query('UPDATE products SET quantity = ? WHERE storeId = ? AND id = ?', [updatedQuantity, storeId, productId[i]], function(err, result){
			if (err) throw err;
		});
	};
	req.session.cart = {};
	//console.log(req.session);
	res.redirect('/products');
};