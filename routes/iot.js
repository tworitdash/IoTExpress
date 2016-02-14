var Q = require('q');

module.exports = function(io) {
	
	var allowed_ids = require('./../data/credentials.js').valid_id ;
	var authenticated_pool = [];

	io.on('connection', function(socket){

		socket.on('auth', function(data){
			console.log("Auth request recieved");
			if (data.regId) {
				if(allowed_ids.indexOf(data.regId)>=0){
					socket.authId = data.regId;
					authenticated_pool.push(socket);
					socket.emit("auth",{result:"success"});
					console.log("accepting id "+data.regId);
				}else{
					socket.emit("auth",{result:"failed"});
					console.log("rejecting id "+data.regId);
				}		
			}		
		});
		
		socket.on('disconnect', function(){
			if (socket.authId) {
				console.log('client '+socket.authId+' disconnected');
			}
		});

	});

	return {
		BroadcastMessageToValidUser : function(channel, msg){
			var deferred = Q.defer();
			if (authenticated_pool.length) {
				var uniqueIdsOnly = [];
				authenticated_pool.forEach(function(ele, indx, arr){
					ele.emit(channel, msg);
					if(indx == arr.length-1){
						deferred.resolve(true);
					}
				});	
			}else{
				deferred.reject('failed');
			}

			return deferred.promise;
		}
	};
}