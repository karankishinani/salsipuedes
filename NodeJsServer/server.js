// SERVIDOR

var port = 1234;
var io = require('socket.io')(port);
var shortId = require('shortid');
var datasetup = require('./database_client/databaseClient.js');
var clients = [];
var clientLookup = [];

//Get Server IP
var getIP = require('external-ip')();
 
getIP(function (err, ip) {
    if (err) {
        // every service in the list has failed 
        throw err;
    }
    console.log("Conectate a " + ip + ":" + port)
});

console.log("Start Version " + datasetup.version);
console.log("Starting ...")

datasetup.connect(function (err_connect) {
    datasetup.loadallUser(function (err, data) {
        if (data.length > 0) {
            console.log("Data : %j" , data);
        } else {
            console.log("Data is emty");
        }
    });
});

io.on('connection', function (socket) {
	var currentClient;
	console.log("Jugador se ha conectado");
	//Put your socket.on events here
	


	// Carlos register
	socket.on('signup', function(data){
		console.log(data);
		datasetup.addUser(data.name, data.password, function(err, dataQuery){
			if(err){
				console.error(err); // donde el usuario o el password esten incorrectos
				socket.emit('registerUnsuccess', {         
					message : 'usuario ya existe'
				});
			}else{				
				socket.emit('registerSucces', {name: dataQuery.Username});       
			}
		});
	});
	
	//Grupo B Login

    socket.on('login', function(data)  {  
		for (i = 0; i < clients.length; i++) {            
            if (clients[i].data.Username === data.name) {
				socket.emit('loginUnsuccess', {         
					message : 'Este usuario esta conectado'
				});
				return;
			}
		}
        datasetup.searchUser(data.name, data.password, function(err, data){
			if (err) { 
                console.error('Error: '+err); 
				socket.emit('loginUnsuccess', {         
					message : 'Error en la base de datos'
				});
            }else if(data == null){
				console.log('usuario o password incorrecto');
				socket.emit('loginUnsuccess', {         
					message : 'Usuario o contraseña incorrectos'
				});
			}else{
				console.log("Login exitoso");
				currentClient = 
				{
					id: shortId.generate(),
					data: data,
					position: "11.85,0,5.3"
				};
				socket.emit('loginSuccess', {         
					message : 'Bienvenido a Salsipuedes'
				});
				socket.broadcast.emit('playerconnected', {name: currentClient.data.Username});       
				console.log("swapping", currentClient.data.Username);
				socket.broadcast.emit('swapPlayer', {
					name: currentClient.data.Username, 
					id: currentClient.id, 
					position: currentClient.position
				}); // swapAllPlayer ?
					
				clients.push(currentClient);
				clientLookup[currentClient.id] = currentClient;
			}
		});
    });
	socket.on('LoadMap', function () {

        console.log("LoadMap ");
        for (i = 0; i < clients.length; i++) {            
            if (clients[i].data.Username === currentClient.data.Username) {
            } else {
                console.log(currentClient.data.Username + " has LoadMap in : " + clients.length);
				console.log(clients[i].data.name,clients[i].id,clients[i].position)
                socket.emit('swapAllPlayer', {
                    Name : clients[i].data.Username,
                    Id : clients[i].id,
                    Position : clients[i].position,
                })
            }
            
        }

    });
	
//MOVIMIENTO (EQUIPO C)
	socket.on('posicionjugador',function(data){ //Recibe la distancia del cliente
	 currentClient.position = data.position;
     console.log(currentClient.data.Username + " move to " + currentClient.position);
	 socket.broadcast.emit('nuevaposicion', {
		name : currentClient.data.Username,
		position : currentClient.position,
 	 });
	});
	


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
                name: currentClient.data.Username,
            });

        for (i = 0; i < clients.length; i++) {
            if (clients[i].data.Username === currentClient.data.Username) {
                console.log(clients[i].data.Username + " has been disconnected");
                clients.splice(i, 1);
            }
        }

    });

    // LOGOUT (Equipo D)
    socket.on('logout', function() {

        // cerrar el socket del cliente
        socket.disconect();

        socket.broadcast.emit('Playerdisconnected', {
                name: currentClient.data.Username,
            });

        for (i = 0; i < clients.length; i++) {
            if (clients[i].data.Username === currentClient.data.Username) {
                console.log(currentClient.data.Username + " has logged out");
                clients.splice(i, 1);
            }
        }

    });

});