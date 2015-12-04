socket.on('connect', function() {

     //Equipo B
    
    socket.on('login'), function(data)  {
        //TODO
    }

    //socket.broadcast.emit('playerconnected', {name: currentClient.data.name});   Equipo B    
    //socket.broadcast.emit('swapPlayer', {name: currentClient.data.name, id: currentClient.id, position: currentClient.position, color: currentClient.color}); // swapAllPlayer ? Equipo B
    //socket.emit('loginUnsuccess', { message : 'usuario o password incorrecto'})   Equipo B
    
    // LOGOUT Lanzar evento de desconectar por logout en el cliente (Equipo D)
    socket.emit('logout');

    // PARTIDA TERMINADA (Equipo D)
    socket.emit('partidaTerminada', {
        // TODO: agregar datos a enviar para grabar a la BD en formato JSON
        // data.name, data.partida, data.personaje, data.ganador
    });

    // Generado por LOGOUT (Equipo D)
    socket.on('Playerdisconnected', function(data){
    	// TODO: informar el Log out a los demas clientes en client
    	console.log(data.name + ' has logged out.')
    });

});