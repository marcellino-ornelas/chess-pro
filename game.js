/*
 * Modules
*/
var socket = require('socket.io');
const db = require('./models');
var io = null;

const games = {};

function disconnectGame( gameId ){
  delete games[ gameId ];

  db.Game.findByIdAndRemove( gameId ).exec(function(err, deletedItem){
    if( err ) return console.log(err);
    // clear socket
    // io.sockets.in( gameId ).clients(function(err, socketIds){
    //   socketIds.forEach(socketId => io.sockets.sockets[socketId].leave( gameId ));
    // });
  })

}

exports.io = function () {
  return io;
};

exports.initialize = function(server) {
  io = socket(server);

  io.on('connection', function(socket) {

    socket.on('join', function(gameId){
      if( typeof game[gameId] === 'object' ) return;
      const players = ( games[gameId] || 0 ) + 1;

      if( players <= 2){
        socket.join(gameId);
        games[gameId] = players;
        socket.gameId = gameId;
      }

      if( players === 2){
        db.Game.findById( gameId ).populate('player1','player2').exec(function(err, game){
          games[gameId] = game;
          io.to( gameId ).emit('start game', game );
        })
      }
    })



    socket.on('disconnect', function(){

      console.log('disconnected ', socket.gameId);

      if( games[ socket.gameId ] ){
        // if game hasnt been deleted already
        io.in( socket.gameId ).emit('playerError');

        // delete games[ socket.gameId ];

        // db.Game.findByIdAndRemove( socket.gameId ).exec(function(err, deletedItem){
        //   if( err ) return console.log(err);
        //   // clear socket
        //   // io.sockets.in( socket.gameId ).clients(function(err, socketIds){
        //   //   socketIds.forEach(socketId => io.sockets.sockets[socketId].leave( socket.gameId ));
        //   // });
        // })
        disconnectGame( socket.gameId );
      }

    });

    socket.on('move', function( move ){
      socket.to( socket.gameId ).emit('opponent move', move );
    });

    socket.on('end game', function( team ){

      const game = games[ socket.gameId ];

      socket.to( socket.gameId ).emit('game over', move );

    });

  });

  return io;
};
