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
    console.log('user connected');

    socket.on('join', function(gameId){
      const players = ( games[gameId] || 0 ) + 1;
      console.log('players', players);

      if( players <= 2){
        socket.join(gameId);
        console.log('player has now joined ', socket.room);
        games[gameId] = players;
        socket.gameId = gameId;
      }

      if( players === 2){
        // socket.broadcast.emit('joined',  )
          db.Game.findById( gameId ).populate('player1', 'player2').exec(function(game){
            console.log(game);
            io.to( gameId ).emit('log', 'hey')
            io.to( gameId ).emit('start game', game );
          })

      }
    })



    socket.on('disconnect', function(){
      // update list of users in chat, client-side
      // io.sockets.emit('updateusers', usernames);
      // echo globally that this client has left
      socket.broadcast.emit('playerError');
      delete games[ socket.gameId ];
      // socket.leave(socket.room);

      db.Game.findByIdAndRemove( socket.gameId ).exec(function(err, deletedItem){
        if( err ) return console.log(err);
        console.log('deleted')
        // io.sockets.clients( socket.gameId ).forEach(function(s){
        //   s.leave( socket.gameId );
        // });
      })

    });

    // socket.emit('chess message', 'hey loser')
  });

  return io;
};
