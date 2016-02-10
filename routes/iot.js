module.exports = function(io) {
	var clients = [];
	io.on('connection', function(socket){

		clients.push(socket);

		console.log('a user is connected');
		socket.on('disconnect', function(){
			console.log('user disconnected');
		});

		socket.on('message', function(data){
			console.log(data);
			for(var i = 0; i < clients.length; i++){
				clients[i].send(data);
			}
		});
	});
}