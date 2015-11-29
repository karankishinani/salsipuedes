var io = require('socket.io')(1234);
var shortId = require('shortid');
var datasetup = require('./database_client/databaseClient.js');

console.log("Start Version " + datasetup.version);

io.on('connection', function (socket) {
	var currentClient;
	//Put your socket.on events here


	//TODO: agregar usuario al socket

	socket.on('login', function(data){  // parametros aqui? y es data? 

		var success = datasetup.searchUser(data.name, data.password, data.character); // esta funcion retornara algo?

		if (success)
		{
			socket.broadcast.emit('playerconnected', {name: currentClient.data.name});       // nombres reservados..?
			socket.broadcast.emit('swapPlayer', {name: currentClient.data.name, id: currentClient.id, position: currentClient.position, color: currentClient.color}); // nombres reservados?
			//add player to socket

		}
		else
		{
			socket.emit('loginUnsuccess', {         //referencia "app.js"
                        message : 'User not found'
                    });
		}


	});
});