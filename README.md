# Salsipuedes - GameServer
This project is a NodeJS game server that connect a unity game and let play multiplayer online using sockets.

It born in a undergraduate class of Data Base under the direction of professor Victor López in the UTP (Universidad
Tecnológica de Panamá), this project is the final test of the entire classroom. 

Project Manager:
* Carlos

TeamWork:
* Axel - Vladimir - Erick - Tobar - Jorge		(Equipo A)
* Arana - Jonathan - Gilberto				(Equipo B)
* Diego - Troby - Yanis					(Equipo C)
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
-recibe data con atributos .name, .password, .character y valida que exista un usuario con nombre y contraseña iguales.
Manda mensaje de exito o error enviando la .emit('loginsuccess') or unsuccess
####dataSetup.searchUser
	-ejecuta query de busqueda

De ser exito envia broadcast.emit('playerconnected'){ name}
y agrega usuario al socket

y envia broadcast.emit('swapPlayer'){id, position, job}//osea envia a todos los jugadores el id posicion y lo que es el jugador por primera vez

***Vease diferencia swapAllplayer


##Equipo C
###on.loadGame
-envia al cliente la posicion de todos los jugadores .emit('swapAllPlayer'){name, position, job}
***Vease diferencia swapPlayer

###.move
-envia a todos bradcast.emit('playermove'){name, position}


##Equipo D
###.partidaTerminada
-envia al servidor los resultados de la partida
ver diseño base de datos para ver que envian

###on.respond
-el usuario responde al ping que se le envio

###ping
desde el servidor s eenvia peticion al usuario hacer en este archivo function ping(client){client.emit('ping'){}} o algo parecido

###disconnect
-Desconecta jugador desde el servidor, ya sea banneado o bajo ping o whatever
hacer en este archivo function disconnect(client){client.emit('disconnect'){}} o algo parecido y sacarlo del socket

###on.disconnect
-Desconecta al jugador por peticion del misom usuario


