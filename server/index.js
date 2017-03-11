var express = require('express');
var router = require('./router.js');
var app = express();


function server(mongoose) {
    app.listen(3000, function () {
        console.log('im listen')
    });
    router(app,express,mongoose);
}

module.exports = server;