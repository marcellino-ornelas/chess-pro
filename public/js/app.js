$(function(){
  console.log('starting up script');

  $('.sidenav').sidenav();

  const socket = io('http://localhost:3000');

  socket.on('connection', function(){
    console.log('chess game is now connected')
  })

  // $('form').on('submit',function(e){
  //   e.preventDefault()
  //   console.log('submit')
  // })

});
