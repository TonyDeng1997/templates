//Load library
var express = require('express');
var reload = require('reload');
var app = express();
var dataFile = require('./data/data.json');
var io = require('socket.io')();

//Set server to run on tcp port 3000, app is like a big hashmap
app.set('port', process.env.PORT || 3000 );

// Assign the var to a key-'appData', app.get('appData'), kinda like global vars
app.set('appData', dataFile);

//local variables shared by all the view pages
app.locals.siteTitle = 'Roux Meetups';
app.locals.allSpeakers = dataFile.speakers;

//Set up view and view engine
app.set('view engine', 'ejs'); // view engine can be mastache/handlebarjs/ejs html template
app.set('views', 'app/views');

// Set up controller
app.use(express.static('app/public'));
app.use(require('./routes/index'));
app.use(require('./routes/speakers'));
app.use(require('./routes/feedback'));
app.use(require('./routes/api'));
app.use(require('./routes/chat'));
app.use(require('./routes/termofuse'));
app.use(require('./routes/privacy'));


// Set up server event, please note the callback function
var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

// Set up chat server, please do not pay attention now
io.attach(server);
io.on('connection', function(socket) {
  socket.on('postMessage', function(data) {
    io.emit('updateMessages', data);
  });
});

// Enable server hotplug feature, save and take in effect
reload(server, app);
