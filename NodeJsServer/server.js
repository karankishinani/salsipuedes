// SERVIDOR

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


// PARTIDA TERMINADA (Equipo D)
    socket.on('partidaTerminada', function(data) {
        /*    
        LOS DATOS A ALMACENAR EN LA BD SON:
        TABLA: Juega
        DATOS: id_usuario, id_partida, personaje (runner o chaser), Equipo ganador (true o false)
        */
        datasetup.guardarPartida(data.name, data.partida, data.personaje, data.ganador, function(err, dataP) {});
    });

    // ON DISCONNECT al desconectarse el cliente del servidor (Equipo D)
    socket.on('disconnect', function() {

        socket.broadcast.emit('Playerdisconnected', {
                name: currentClient.data.name,
            });

        for (i = 0; i < clients.length; i++) {
            if (clients[i].data.name === currentClient.data.name) {
                console.log(clients[i].data.name + " has been disconnected");
                clients.splice(i, 1);
            }
        }

    });

    // LOGOUT (Equipo D)
    socket.on('logout', function() {

        // cerrar el socket del cliente
        socket.disconect();

        socket.broadcast.emit('Playerdisconnected', {
                name: currentClient.data.name,
            });

        for (i = 0; i < clients.length; i++) {
            if (clients[i].data.name === currentClient.data.name) {
                console.log(currentClient.data.name + " has logged out");
                clients.splice(i, 1);
            }
        }

    });

});