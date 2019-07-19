var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var expressLayouts= require('express-ejs-layouts');
var app = express('cors');
var assert = require('assert');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://User:Adelin99@adelindb-xjpyf.mongodb.net/test?retryWrites=true&w=majority"
MongoClient.connect(uri, function(err, client){
if(err) {
    console.log('Error occurred wile connecting to MongoDB Atlas...\n', err);
}
console.log('Connected...');
const collection = client.db("Project").collection("categories");
// perform actions on the collection object
client.close();
});

app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cors());
app.use(expressLayouts);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/CSS', express.static('CSS'));

 app.get('/', function(req, rep){
 rep.sendFile(__dirname + '/Categories.ejs')
 });

 app.get('/', function(req, rep){
     rep.sendFile(__dirname + '/Products.ejs')
    });

    app.get('/', function(req, rep){
        rep.sendFile(__dirname + '/ProductsDes.ejs')
       });

app.get('/', function(request, res) {
    res.render('index');
});

app.get('/', function(request, response) {
res.render('index', {
    people:[
        {name:"dave"},
        {name: jerry}
    ]
 });
});



app.listen(8000, function(){
    console.log("heard on 8000");
});