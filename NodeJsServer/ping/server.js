var app = require('http').createServer()
var io = require('socket.io')(app)
var port = 8000

app.listen(port);

console.log('http server listening on %d port', port)

console.log('socket.io server created!')

io.on('connection', function(socket) {
	var id = setInterval(function() {
		socket.emit('message', 'ping from server: ' + new Date())
	}, 1000)

	console.log('socket.io connection open!')

	socket.on('message', function(message) {
		console.log(message)
	})

	socket.on('disconnect', function() {
		console.log('socket.io connection closed')
		clearInterval(id)
	})
})