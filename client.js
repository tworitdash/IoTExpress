var socket = require('socket.io-client')('http://localhost:3001');

var timeoutid ;

socket.on('connect', function(){

  // try auth once
    socket.emit('auth',{regId : "1a3bjq"});
    
    socket.on('auth',function(data){
      if (data.result === "success"){
        console.log("Auth success");
        clearTimeout(timeoutid);
      }else{
        timeoutid = setTimeout(function(){
          socket.emit('auth',{regId : "1a3bjq"}); // try again  
        },5000);        
      }
    });

    socket.on("garage", function(data){
    	console.log(data);
    });

    socket.on('disconnect', function(){
      console.log('Disconnected from server');
    });
});
