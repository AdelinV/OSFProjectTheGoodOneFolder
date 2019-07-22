
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressLayouts= require('express-ejs-layouts');
var app = express('cors');
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
//var mongoose = require('mongoose');
//mongoose.connect('uri');

const uri = "mongodb+srv://User:Adelin99@adelindb-xjpyf.mongodb.net/test?retryWrites=true&w=majority"

function getFromDatabase(category, queryString) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(uri, function(err, client) {
            if(err) {
                console.log('Error occurred wile connecting to MongoDB Atlas...\n', err);
            }
            console.log('Connected...');
            const collection = client.db("Project").collection(category);
            // perform actions on the collection object
            collection.find(queryString).toArray(function(err, items) {
                console.log("here " + items);
                if (err) {
                    reject(err)
                } else {
                    resolve(items);
                }
            });
            client.close();
        });
    });
}
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'));
app.use('/public', express.static('public'))

 app.get('/:category', function(req, rep){
    queryString = {
        id: req.params.category
    }
    var categories = getFromDatabase("categories", queryString).then(function(result) {
        rep.render(__dirname + '/views/Categories.ejs', {
            result : result[0].categories, 
            name: result[0].name,
            pageDescription: result[0].page_description
        });
    });

    return;
 });

 app.get('/:category/:test', function(req, rep){
    
    queryString = {
        id: {$in: [req.params.test]}
    }

    var categories = getFromDatabase("categories", queryString).then(function(result) {
        console.log(queryString);
        rep.render(__dirname + '/views/Categories.ejs', {
            result : result
        });
    });
});

app.get('/:category/:test/:productCat', function(req, rep){
    queryString = {
        primary_category_id: req.params.productCat
    }
    var categories = getFromDatabase("products", queryString).then(function(result) {
        console.log(result);
        rep.render(__dirname + '/views/Products.ejs', {
            result : result
            
        });
    });

    return;
   });

   app.get('/:category/:test/:productCat/:ProductID', function(req, rep){
    queryString = {
        id: req.params.ProductID
    }
    var categories = getFromDatabase("products", queryString).then(function(result) {
        console.log(result[0]);
        rep.render(__dirname + '/views/ProductsDes.ejs', {
            result : result[0]
            
        });
    });

    return;
   });

app.get('/', function(request, rep) {
    rep.render('index', {
    people:[
        {name:"dave"},
        {name: "jerry"}
    ]
 });
});

app.listen(8000, function(){
    console.log("heard on 8000");
});