$(function(){
  console.log('starting up script');


  $('.sidenav').sidenav();
  $('.modal').modal();

  if( typeof io === 'function' ){

    const socket = io('http://localhost:3000');

    socket.on('connect', function(){
      M.toast({ html: 'Welcome to chess pro. Please wait while we connect you with another player.' });
      // socket.on('disconnect', function(){ });
      // console.log(socket)
      socket.emit('join', game_id);

      socket.on('start game', function(game){
         // M.toast({ html: 'Welcome to chess pro. Please wait while we connect you with another player.' });
        console.log('start game ',game);
      })

      socket.on('playerError',function(){
        alert('something bad has happened sorry');
        window.location.replace('http://localhost:3000/game');
      })

      // socket.on('moved', function( message ){
      //   console.log('moved to ' + message);
      // })

      socket.on('playerError',function(){
        alert('something bad has happened sorry');
        window.location.replace('http://localhost:3000/game');
      })
    });



    // socket.on('chess move', function(message){
    //   console.log('chess game is now connected')
    //   console.log(message)
    // })
  }


  // $('form').on('submit',function(e){
  //   e.preventDefault()
  //   console.log('submit')
  // })

});
