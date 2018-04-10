/*
 * Modules
*/
var socket = require('socket.io');
const db = require('./models');
var io = null;

const games = {};

exports.io = function () {
  return io;
};

exports.initialize = function(server) {
  io = socket(server);

  io.on('connection', function(socket) {

    socket.on('join', function(gameId){
      const players = ( games[gameId] || 0 ) + 1;

      if( players <= 2){
        socket.join(gameId);
        games[gameId] = players;
        socket.gameId = gameId;
      }

      if( players === 2){
        db.Game.findById( gameId ).populate('player1','player2').exec(function(err, game){

          io.to( gameId ).emit('start game', game );
        })
      }
    })



    socket.on('disconnect', function(){

      console.log('disconnected ', socket.gameId);

      io.in( socket.gameId ).emit('playerError');
      if( games[ socket.gameId ] ){
        // if game hasnt been deleted already
        delete games[ socket.gameId ];
        // socket.leave(socket.room);

        db.Game.findByIdAndRemove( socket.gameId ).exec(function(err, deletedItem){
          if( err ) return console.log(err);
          // console.log(io.sockets.clients( socket.gameId ))
          // io.sockets.clients( socket.gameId ).forEach(function(s){
          //   s.leave( socket.gameId );
          // });
        })
      }

    });

    socket.on('move', function(){
      console.log('hey')
      // socket.brodcast

    })
  });

  return io;
};
