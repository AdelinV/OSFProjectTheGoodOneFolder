var categories     = require('./routes/categories.js');
var products       = require('./routes/products');
var express        = require('express');
var bodyParser     = require('body-parser');
var cors           = require('cors');
var path           = require('path');
var expressLayouts = require('express-ejs-layouts');
var app            = express('cors');
var assert         = require('assert');
var mongoDB        = 'mongodb+srv://User:Adelin99@adelindb-xjpyf.mongodb.net/Project?retryWrites=true&w=majority';
var fs             = require('fs');

app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);

//load all file in models dir
fs.readdirSync(__dirname +'/models').forEach(function(filename){
    if (~filename.indexOf('.js')) require(__dirname +'/models/' + filename)
});

app.get('/', function(req, res, next) {
        res.render('index.ejs');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'));
app.use('/public', express.static('public'));
app.use('/models', express.static('models'));

app.use('/', categories);

app.listen(8000, function() {
    console.log("heard on 8000");
});