const express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);
const PORT = process.env.PORT || 5000;

var home = require('./routes/index')

room = 'abc';

app.use(express.static(path.join(__dirname, 'public'))); 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', home);

io.on('connection', function(socket){
    
    socket.on('createroom', function(createroom){
      socket.join(createroom);
      room = createroom;
      console.log(socket.id +" joined " + createroom);
    });
    
    prev_statusx = -1; // -1 == unstarted, the default, starting value
  socket.on('statusx', function(statusx, room){
      if (statusx == 3) {
          prev_statusx = statusx;
          io.in(room).emit('statusx', statusx);
      }
      else if (statusx !== prev_statusx){
          prev_statusx = statusx;
          io.in(room).emit('statusx', prev_statusx);
      }
  });
  socket.on('status', function(status){
    io.emit('status', status);
    console.log(status);
  });
  socket.on('currenttim', function(currenttim){
    io.in(room).emit('currenttim', currenttim);
    console.log(currenttim);
  });
  socket.on('links', function(links){
    io.emit('links', links);
    console.log(links);
  });
  socket.on('disconnect', function () {
    io.emit('user disconnected');
    console.log('a user disconnected')
  });
  ID = socket.id;
  console.log('client connected id: ' + socket.id);
    
});


http.listen(PORT, () => console.log(`Listening on ${ PORT }`));