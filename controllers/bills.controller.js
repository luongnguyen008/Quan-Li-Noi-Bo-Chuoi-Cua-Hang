
var mysql = require('mysql')
var con = require('../mysql-connection')



module.exports.createbills = function (req, res, ) {
    
    res.render('./bills/createbills');
  };
 module.exports.postCreateBills = function (req, res) {
   
  var errors = [];
  if(!req.body.billProductid){
    errors.push("Productid is required");
  }
  if(!req.body.bill.number){
    errors.push("Number is required");
  }
  
  
  if(errors.length){
    res.render('/bills/createbills', {
      errors: errors,
      values: req.body
    });
    return;
  }

module.exports.viewBill = function(req, res){
  var id = req.params.billProductid;
  con.query('SELECT * FROM cart WHERE Id = ?', Id, function(err, result){
    res.render('./bills/viewbills', {cart: result});
  })
};
module.exports.deleteBill = function(req, res){
   var billProductid = req.params.billProductid; 
  con.query('DELETE FROM cart WHERE cartId = ?',cartId, function (err, result){
    if (err) throw err;
  res.redirect('/viewbills');
 });
};
var values = [
  req.body.cartId, 
  req.body.cartName, 
  req.body.cartPrice,
   
  ];