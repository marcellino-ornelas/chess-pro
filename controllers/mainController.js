/*
 * Modules
*/

module.exports.home = function( req, res ){
  res.locals.page = 'home';
  res.render('index');
}

module.exports.about = function( req, res ){
  res.locals.page = 'about';
  res.render('about');
}
