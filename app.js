var server = require('./server');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/toDoList');
var db = mongoose.connection;

server(mongoose);