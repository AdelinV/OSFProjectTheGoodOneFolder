var router = require('./routes/categories.js');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressLayouts= require('express-ejs-layouts');
var app = express('cors');
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
var mongoDB = 'mongodb+srv://User:Adelin99@adelindb-xjpyf.mongodb.net/test?retryWrites=true&w=majority';
var fs = require('fs');

app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);

//load all file in models dir
fs.readdirSync(__dirname +'/models').forEach(function(filename){
    console.log(__dirname +'/models');
    if (~filename.indexOf('.js')) require(__dirname +'/models/' + filename)
});

// function getFromDatabase(category, queryString) {

//     return new Promise(function(resolve, reject){
//     //Import the mongoose module
//     var mongoose = require('mongoose');

//     //Set up default mongoose connection

//     mongoose.connect(mongoDB, { useNewUrlParser: true });

//     //Get the default connection
//     var db = mongoose.connection;
//     mongoose.connection.close();
//     //Bind connection to error event (to get notification of connection errors)
//     db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//     if (err) {
//                             reject(err)
//                          } else {
//                              resolve(items);
//                          }
//     }

// }


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'));
app.use('/public', express.static('public'));
app.use('/models', express.static('models'));

app.use('/', router);

//  app.get('/:category', function(req, rep){
//     queryString = {
//         id: req.params.category
//     }
//     var categories = getFromDatabase("categories", queryString).then(function(result) {
//         rep.render(__dirname + '/views/Categories.ejs', {
//             result : result[0].categories, 
//             name: result[0].name,
//             pageDescription: result[0].page_description
//         });
//     });

//     return;
//  });

//  app.get('/:category/:test', function(req, rep){
    
//     queryString = {
//         id: {$in: [req.params.test]}
//     }

//     var categories = getFromDatabase("categories", queryString).then(function(result) {
//         console.log(queryString);
//         rep.render(__dirname + '/views/Categories.ejs', {
//             result : result
//         });
//     });
// });

// app.get('/:category/:test/:productCat', function(req, rep){
//     queryString = {
//         primary_category_id: req.params.productCat
//     }
//     var categories = getFromDatabase("products", queryString).then(function(result) {
//         console.log(result);
//         rep.render(__dirname + '/views/Products.ejs', {
//             result : result
            
//         });
//     });

//     return;
//    });

//    app.get('/:category/:test/:productCat/:ProductID', function(req, rep){
//     queryString = {
//         id: req.params.ProductID
//     }
//     var categories = getFromDatabase("products", queryString).then(function(result) {
//         console.log(result[0]);
//         rep.render(__dirname + '/views/ProductsDes.ejs', {
//             result : result[0]
            
//         });
//     });

//     return;
// });

app.listen(8000, function(){
    console.log("heard on 8000");
});