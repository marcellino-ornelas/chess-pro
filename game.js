/*
 * Modules
*/
const socket = require('socket.io');

module.exports = function(server){

  const io = socket( server );

  io.on('connection', function(){
    console.log('connection established');
  });

  return io

}
