/*
 * Modules
*/

const db = require('../models');
const passport = require('passport')


// module.exports.index = function( req, res ){
//   res.render('index')
// }

// get
module.exports.show = function( req, res ){

  const id = req.params.id

  db.User.findById( id ).exec(function( err, user ){

    if( err || !user ){
      req.flash('error', 'User does not exist');
      res.redirect( '/profile' );
    }

    res.render('user/profile', { user: user, isProfile: false });
  })

}

module.exports.profile = function( req, res ){
  res.render('user/profile', { user: req.user, isProfile: true });
}

module.exports.new = function( req, res ){
  res.render('auth/signup');
}

// post
module.exports.create = function( req, res ){

  const body = req.body
  res.locals.data = body;

  db.User.register(new db.User( body ), body.password, function( err, newUser ) {
    if (err) {
      console.log(err)
      req.flash("error", "There was a problem signing you up. Please try again later")
      res.redirect("/signup");
    } else {
      passport.authenticate('local')(req, res, function() {
        res.redirect('/profile');
      });
    }
  });
}

module.exports.edit = function( req, res ){
  res.render('user/edit');
}

module.exports.update = function( req, res ){
  // res.render('index');
}

module.exports.delete = function( req, res ){
  // res.render('index');
}

module.exports.login = function( req, res ){
  res.render('auth/login');
}

module.exports.logout = function( req, res ){
  req.logout();
  req.flash("success", "You have successfully been logged out");
  res.redirect('/');
}
