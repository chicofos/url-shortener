var express = require('express');
var app = express();
var ejs = require('ejs');
var mongoose = require('mongoose');
var config = require('./config');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://' + config.db.host + '/' + config.db.name);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

var router = require('./router')(express);
app.use(router);

app.listen(port, function(){
    console.log('Server running on port %s', port);
})