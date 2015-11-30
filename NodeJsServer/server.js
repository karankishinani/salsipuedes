// SERVIDOR

var io = require('socket.io')(1234);
var shortId = require('shortid');
var datasetup = require('./database_client/databaseClient.js');

console.log("Start Version " + datasetup.version);

var clients = []; // Arreglo con la lista de clientes conectados al server con log in

io.on('connection', function(socket) {
    var currentClient;
    //Put your socket.on events here

    // NOTA: revisar la otra version de Ping de cliente y servidor en la carpeta "PING"

    // PONG al cliente
    /*Seccion del ping del servidor que emite un "pong" o señal de respuesta al ping del cliente*/
    socket.on('ping', function() {
        socket.emit("pong");
    });

    // PARTIDA TERMINADA
    socket.on('partidaTerminada', function(data) {
        // agregar llamada a funcion para almacenar en la BD
        //dataSetup.(...)
    });

    // DISCONNECT al desconectarse el cliente del servidor
    socket.on('disconnect', function() {

        socket.broadcast.emit('Playerdisconnected', {
                name: currentClient.data.name,
            });

        for (i = 0; i < clients.length; i++) {
            if (clients[i].data.name === currentClient.data.name) {
                console.log(clients[i].data.name + " has been disconnected");
                /* Verificar si incluir esto:
                datasetup.UpdatePosition(currentClient.data.name, currentClient.position, function (err, dataP) {
                }); */
                clients.splice(i, 1);
            }
        }

    });

    // DISCONNECT por fuerza, por petición o por ban
    socket.on('force disconnect', function() {
        socket.disconect();
        // ver si se elimina de clients al cliente actual
        // ver si se cierra el socket
    });

});

// ----------

// CLIENTE

/* Aqui se coloca temporalmente las funciones del cliente */

socket.on('connect', function() {

    // PING al servidor
    // mandar ping
    setInterval(function() {
        startTime = Date.now();
        socket.emit('ping');
    }, 2000);
    // recibir pong
    socket.on('pong', function() {
        latency = Date.now() - startTime;
        console.log(latency);
    });

    // Lanzar evento de desconectar por fuerza, por petición o por ban
    // agregar alguna condicion o evento dependiendo de la aplicacion antes aqui
    socket.emit('force disconnect');

    // CUANDO PARTIDA ES TERMINADA
    socket.emit('partidaTerminada', {
            // agregar datos a enviar para grabar a la BD en formato JSON
        });

});