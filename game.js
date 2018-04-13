/*
 * Modules
*/
var socket = require('socket.io');
const db = require('./models');
// const async = require('async');
var io = null;

const games = {};

function disconnectGame( gameId ){

  return db.Game.findByIdAndRemove( gameId ).exec()
      .then(function(deletedItem){
          delete games[ gameId ];
          // clear socket
          // io.sockets.in( gameId ).clients(function(err, socketIds){
          //   socketIds.forEach(socketId => io.sockets.sockets[socketId].leave( gameId ));
          // });
      })
      .catch(function(err){
        console.log(err);
      });
}

exports.io = function () {
  return io;
};

exports.initialize = function(server) {
  io = socket(server);

  io.on('connection', function(socket) {

    socket.on('join', function(gameId){
      if( typeof games[gameId] === 'object' ) return;
      const players = ( games[gameId] || 0 ) + 1;

      if( players <= 2){
        socket.join(gameId);
        games[gameId] = players;
        socket.gameId = gameId;
      }

      if( players === 2){
        db.Game.findById( gameId ).populate('player1').populate('player2').exec(function(err, game){
          console.log("\nGame object........\n",game,'\n');
          games[gameId] = game;
          io.to( gameId ).emit('start game', game );
        })
      }
    })



    socket.on('disconnect', function(){

      console.log('disconnected ', socket.gameId);

      if( games[ socket.gameId ] ){
        // if game hasn't been deleted already
        io.in( socket.gameId ).emit('playerError');

        // end game
        disconnectGame( socket.gameId );
      }

    });

    socket.on('move', function( move ){
      socket.to( socket.gameId ).emit('opponent move', move );
    });

    socket.on('end game', function( team ){

      const game = games[ socket.gameId ];
      const rating = new db.Rating();

      game.player1.ratings.push(rating._id);
      game.player2.ratings.push(rating._id);

      rating.player2 = game.player2._id;
      rating.player1 = game.player1._id;

      if( team === 'white' ){
        game.player1.wins++
        rating.winner = game.player1._id;
      } else {
        game.player2.wins++
        rating.winner = game.player2._id
      }

      rating.save()
        .then(function(rating){
          return Promise.all([
            game.player1.save(),
            game.player2.save()
          ]);
        })
        .then( disconnectGame( socket.gameId ) )
        .then(function(){
          socket.to( socket.gameId ).emit('game over', team );
        })
        .catch(function(err){
          console.log(err);
        });
    });

  });

  return io;
};
