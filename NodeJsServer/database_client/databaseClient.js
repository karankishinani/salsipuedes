function datasetup() {
    this.version = '0.0.1';
    var db = null;
    var mysql = require('mysql');
    var config = {
        host : '127.0.0.1',
		port : '3307',
        user : 'root',
        password : '-DxDiag95',
        database : 'prueba',
    }

    //put your this.function here
    this.connect = function(callback){
        db = mysql.createConnection(config);
        db.connect(function(err){
            if(err){
                console.log('Error al conectarse al servidor');
                return;
            }
            console.log('Conexion Exitosa');
            callback(err);
        });
    };
    //Equipo A
    this.addUser = function (user, pass, callback) {

        db.query("INSERT INTO usuario ( `username`, `password`) VALUES (?,?)",[user,pass], function (err, data) {
            if (err) { 
                console.log('Error al registrar usuario');
                console.error(err); 
            }
            else{ 
                console.log('Usuario registrado exitosamente');
            }
            callback(err, data);
        });

    };
    //Equipo A
    this.loadallUser = function (callback) {

        var sql = 'select * from usuario';

        db.query(sql, function (err, data) {
            if (err) { console.error(err); }

            callback(err, data);
         });
    };

    //Equipo B
    this.searchUser = function (user, pass, callback) {

        db.query("SELECT Username, Password FROM USUARIO WHERE Username = \"" +user+ "\" AND Password = \""+pass+"\"", function (err, data) { 
            callback(err, data[0]);  //retorna algo?
        });

    };
    
    // Guardar datos despues de PARTIDA TERMINADA (Equipo D)
    this.guardarPartida = function(user, partida, personaje, ganador, callback) {
        db.query("INSERT INTO Juega ( `id_usuario`, `id_partida`, `personaje`,`ganador`) VALUES (?,?,?,?)", [user, partida, personaje, ganador], function(err, data) {
            if (err) {
                console.error(err);
            }
            callback(err, data);
        });
    };
}

module.exports = new datasetup;

