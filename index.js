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
    prev_statusx = -1; // -1 == unstarted, the default, starting value
  socket.on('statusx', function(statusx){
      if (statusx == 3) {
          prev_statusx = statusx;
          io.emit('statusx', statusx);
      }
      else if (statusx !== prev_statusx){
          prev_statusx = statusx;
          io.emit('statusx', prev_statusx);
      }
  });
  socket.on('status', function(status){
    io.emit('status', status);
    console.log(status);
  });
  socket.on('currenttim', function(currenttim){
    io.emit('currenttim', currenttim);
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
  console.log('client connected id: '+ socket.id);;
});



http.listen(PORT, () => console.log(`Listening on ${ PORT }`));