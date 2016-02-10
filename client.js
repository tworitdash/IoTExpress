var socket = require('socket.io-client')('http://localhost:3001');

socket.on('connect', function(){
    
    

    socket.emit('message', {message: 'Hello'});
    
    socket.on('message', function(msg){
      console.log(msg);
      var temperature = Math.random();
      socket.emit('message', {name: 'ref1', temperature: temperature, type: 'milk'});
    });

    socket.on('disconnect', function(){
      console.log('client: disconnected');
    });
});
  

  

