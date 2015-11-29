var io = require('socket.io')(1234);
var shortId = require('shortid');
var datasetup = require('./database_client/databaseClient.js');

console.log("Start Version " + datasetup.version);

var clients = []; // Arreglo con la lista de clientes conectados al servern con log in

io.on('connection', function (socket) {
	var currentClient;
	//Put your socket.on events here


	// DISCONNECT por peticion del usuario
	socket.on('disconnect', function (){

        socket.broadcast.emit('Playerdisconnected', {
            name : currentClient.data.name,
        });
        
        for (i = 0; i < clients.length; i++) {
            if (clients[i].data.name === currentClient.data.name) {
                console.log(clients[i].data.name + " has been disconnected");
                /* Verificar si incluir esto:
                datasetup.UpdatePosition(currentClient.data.name, currentClient.position, function (err, dataP) {
                }); */
                clients.splice(i,1);
            }
        }
        
    })

});

