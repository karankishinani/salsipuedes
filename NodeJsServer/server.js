var io = require('socket.io')(1234);
var shortId = require('shortid');
var datasetup = require('./database_client/databaseClient.js');

console.log("Start Version " + datasetup.version);

io.on('connection', function (socket) {
	var currentClient;
	//Put your socket.on events here
});