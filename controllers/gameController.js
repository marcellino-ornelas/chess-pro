/*
 * Modules
*/

const db = require('../models');
const passport = require('passport');

// function sendToGame(game){

// }

// get
module.exports.index  = function( req, res ){
  // all open games
  db.Game.find({ status: 'waiting' }).populate('player1').exec(function(err, games){

    if( err ){
      req.flash('error', 'Sorry we are having a problem with our services. Please try again later.');
      req.redirect('/profile');
    }

    res.render('game/index', { games: games });
  })
}

// module.exports.show = function( req, res ){
//   //
// }

module.exports.board = function( req, res ){
  const userId = req.user._id;
  // const gameId = req.params.gameId;


  if( !req.session || !req.session.game ){
    req.flash('error','game does not exist or you do not have permission to join');
    res.redirect('/game');
  }

  res.render('game/board', { game: req.session.game, team: req.session.team });
  // Promise.resolve()
  //   .then(function(){
  //     if( req.session && req.session.game ){
  //       return Promise.resolve(req.session.game)
  //     } else {
  //       return db.Game.findOne({ _id: gameId }).or([{ player1: userId },{ player2: userId }]).exec()
  //     }
  //   })
  //   .then(function(game){
      // res.render('game/board', { game: game })
    // })
    // .catch(function( err ){
    //   console.log(err);
    //
    // })

}

// post
module.exports.create = function( req, res ){
  // create a new game
  const body = req.body

  const game = new db.Game({
    isPrivate: !!body.isPrivate,
    player1: body.player1
  });

  game.save().then(function(game){
    req.session.game = game;
    req.session.team = 'white';
    res.redirect( game.toURL() + '/board' );
    // res.render('game/board', { game: game })
  })
  .catch(function( err ){
    console.log( err )
    req.flash('error', 'There was a problem creating your game please try again');
    res.redirect('/game')
  })
}

module.exports.join = function( req, res ){
  const gameId = req.params.gameId;

  db.Game.findById(gameId).where('player2').equals(null).populate('player1').exec()
    .then(function(game){
      // console.log(game)
      game.player2 = req.user;
      game.status = 'playing';
      return game.save();
    })
    .then(function(game){
      req.session.game = game;
      req.session.team = 'black'
      res.redirect( game.toURL() + '/board');
    })
    .catch(function( err ){
      req.flash('error', 'There was a problem joining this game.');
      res.redirect('/game');
    })

}

module.exports.update = function( req, res ){
  // change a game status
  // res.render('index');
}


