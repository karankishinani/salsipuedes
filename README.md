# Salsipuedes - GameServer
This project is a NodeJS game server that connects to a Unity game and lets play multiplayers online using sockets.

It’s born in an undergraduate class of Database under the direction of professor Victor López in the UTP (Universidad
Tecnológica de Panamá), this project is the final test of the entire classroom. 

Project Manager:
* Carlos

TeamWork:
* Axel - Vladimir - Erick - Tobar - Jorge		(Equipo A)
* Arana - Jonathan - Gilberto				(Equipo B)
* Diego - Troby - Yanys				(Equipo C)
* Karan - Ibarra - Good - Pinzón - Yi			(Equipo D)					

##FAQ
¿Que es .on?
on, evento del socket del servidor que es un receptor, cuando recibe solicitud del cliente se activa evento .on('evento')
¿Que es .emit?
emit, evento del servidor al socket del cliente, envia una solicitud a el cliente

-variacion .bradcast.emit
Envia a los clientes

¿Que es dataSetup?
dataSetup, es una función del archivo dataSetup.js que permite hacer coneccion con la base de datos MySql.
En ella se deben programar cada una de las funciones que ejecutan los queries.


#Funciones
##Equipo A
###dataSetup.connect
	-Conecta con la base de datos
	Manda mensaje de exito o error utilizando console.log

####dataSetup.loadAllUser
	-Alli mismo si hay exito busca si hay usuarios registrados
	Manda mensaje de exito o error utilizando console.log

###on.register
        -Permite crear un usuario nuevo
Manda mensaje de exito o error enviando la .emit('registersuccess') or unsuccess

####dataSetup.addUser
	-De tener exito se ejecuta un query en la base de datos que inserta el usuario.
	Manda mensaje de exito o error utilizando console.log


##Equipo B
###on.login
    -recibe data con atributos .name, .password, .character y valida que exista 
    un usuario con nombre y contraseña iguales.
Manda mensaje de exito o error enviando la .emit('loginsuccess') or unsuccess
####dataSetup.searchUser
	-ejecuta query de busqueda

    De ser exito envia broadcast.emit('playerconnected'){ name}
    y agrega usuario al socket

    y envia broadcast.emit('swapPlayer'){id, position, job}//osea envia a todos los 
    jugadores el id posicion y lo que es el jugador por primera vez

    ***Vease diferencia swapAllplayer


##Equipo C
###on.loadGame
    -envia al cliente la posición de todos los jugadores 
    .emit('swapAllPlayer'){name, position, job}
    ***Vease diferencia swapPlayer

###.move
    -envia a todos broadcast.emit('playermove'){name, position}


##Equipo D
###.partidaTerminada
    Envia al servidor los resultados de la partida
    ver diseño base de datos para ver que envían

###on.logout
    Desconecta jugador desde el servidor, por logout en el cliente

Nota: se debe enviar un emit del cliente al server para hacer su logout

###on.disconnect
    Manejar cuando se desconecta el usuario del servidor

###on.ping (no necesario)
    el cliente responde con un pong al ping que se le envió

Nota: Este módulo NO es necesario implementarlo

###ping (no necesario)
    desde el servidor se envía un ping al cliente 
    hacer en este archivo function ping(client){client.emit('ping'){}} 
    o algo parecido

Nota: Este módulo NO es necesario implementarlo
 
