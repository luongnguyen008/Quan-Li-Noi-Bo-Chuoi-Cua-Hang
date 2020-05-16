module.exports.postCreate = function(req, res, next){
  var errors = [];
  if(!req.body.username){
    errors.push("Username is required");
  }
  if(!req.body.password){
    errors.push("Password is required");
  }
  if(!req.body.name){
    errors.push("name is required");
  }
  if(!req.body.dateofbirth){
    errors.push("dob is required");
  }
  if(!req.body.gender){
    errors.push("gender is required");
  }
  if(!req.body.phone){
    errors.push("phone is required");
  }
  if(!req.body.idcard){
    errors.push("idcard is required");
  }
  if(!req.body.address){
    errors.push("address is required");
  }
  if(!req.body.storeId){
    errors.push("Id store is required");
  }
    if(errors.length){
    res.render('./users/create', {
      errors: errors,
      values: req.body
    });
    return;
  }
  next()
}