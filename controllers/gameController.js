/*
 * Modules
*/

const db = require('../models');
const passport = require('passport');

// get
module.exports.index  = function( req, res ){
  // all open games

}

// module.exports.show = function( req, res ){
//   //
// }

module.exports.board = function( req, res ){
  res.render('game/board')
}

// post
module.exports.create = function( req, res ){
  // create a new game
}

module.exports.join = function( req, res ){
}

module.exports.update = function( req, res ){
  // change a game status
  // res.render('index');
}


