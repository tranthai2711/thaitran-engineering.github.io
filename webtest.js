// initialize everything, web server, socket.io, filesystem, johnny-five
var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')
  , five = require("johnny-five"),
  board,servo,led,sensor;

board = new five.Board();

// on board ready
board.on("ready", function() {

  myMotor = new five.Motor({
    pin: 9
  });

});


// make web server listen on port 80
app.listen(80);


// handle web server
function handler (req, res) {
  fs.readFile(__dirname + '/MotorTesting.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}


// on a socket connection
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
 
  
  // if led message received
  socket.on('myMotor', function (tmp) {
    console.log(tmp);
     if(board.isReady){    myMotor.start(tmp); } 
  });

});
