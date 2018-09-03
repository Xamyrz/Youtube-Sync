const express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
const PORT = process.env.PORT || 5000;
 
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/', (req, res) => res.render('index'));
 
io.on('connection', function(socket){
  socket.on('status', function(status){
    io.emit('status', status);
    console.log(status);
  });
  console.log('a user connected');
  socket.on('disconnect', function () {
    io.emit('user disconnected');
    console.log('a user disconnected')
  });
});



http.listen(PORT, () => console.log(`Listening on ${ PORT }`));