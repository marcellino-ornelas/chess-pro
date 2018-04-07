/*
 * Modules
*/

module.exports.home = function( req, res ){
  res.render('index');
}

module.exports.about = function( req, res ){
  res.render('about');
}
