/*
 * Modules
*/

const db = require('../models');
const passport = require('passport')


module.exports.index = function( req, res ){
  res.render('index')
}

// get
module.exports.show = function( req, res ){

  const id = req.params.id

  db.User
    .findById( id )
    // .populate('ratings', )
    .populate({
        path: 'ratings'
      , options: { sort: { datePlayed: 'asc' }}
    })
    .populate('ratings.winner')
    .populate('ratings.player1')
    .populate('ratings.player2')
    .exec()
    .then(function( user ){
      res.render('user/profile', { user: user, isProfile: false });
    })
    .catch(function(){
      req.flash('error', 'User does not exist');
      res.redirect( '/profile' );
    });

}

module.exports.profile = function( req, res ){



  // db.User.findById( req.user._id )
  //   .populate('ratings', {
  //     modal: 'Rating'
  //   })
  //   // .populate('ratings.winner')
  //   // .populate('ratings.player1')
  //   // .populate('ratings.player2')
  //   .exec()
    // .then(function( user ){
    // })

    db.User.populate( req.user, { path: 'ratings', model: 'Rating', options: { sort: 'asc' } })
    .then(function( user ){
      return db.User.deepPopulate( user,[
        'ratings.winner',
        'ratings.player1',
        'ratings.player2'
      ])
    })
    .then(function(user){
      console.log(user)
      res.render('user/profile', { user: user, isProfile: true });
    })
    .catch(function(err){
      console.log(err)
    });
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
