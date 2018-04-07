/*
 * Modules
*/


// module.exports.index = function( req, res ){
//   res.render('index')
// }

// get
module.exports.show = function( req, res ){
  res.render('profile');
}

module.exports.new = function( req, res ){
  res.render('auth/signup');
}

// post
module.exports.create = function( req, res ){
  res.render('index');
}

module.exports.update = function( req, res ){
  res.render('index');
}

module.exports.delete = function( req, res ){
  res.render('index');
}


// module.exports.login = function( req, res ){
//   res.render('index');
// }
