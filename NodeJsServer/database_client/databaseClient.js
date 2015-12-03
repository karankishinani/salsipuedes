function datasetup() {
    this.version = '0.0.1';
    var db = null;
    var mysql = require('mysql');
    var config = {
        host : '127.0.0.1',
        user : 'root',
        password : '',
        database : 'mydb',
    }

    //put your this.function here
}

module.exports = new datasetup;

// Guardar datos despues de PARTIDA TERMINADA (Equipo D)
this.guardarPartida = function(user, partida, personaje, ganador, callback) {
    db.query("INSERT INTO Juega ( `id_usuario`, `id_partida`, `personaje`,`ganador`) VALUES (?,?,?,?)", [user, partida, personaje, ganador], function(err, data) {
        if (err) {
            console.error(err);
        }
        callback(err, data);
    });
};