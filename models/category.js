var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://User:Adelin99@adelindb-xjpyf.mongodb.net/Project?retryWrites=true&w=majority', { useNewUrlParser: true });

const Schema = mongoose.Schema;

const subCategSchema = new Schema({
    name: String,
    page_description: String,
    id: String,
    image: String,
    parent_category_id: String,
});

const categSchema = new Schema({
    name: String,
    page_description: String,
    id: String,
    image: String,
    parent_category_id: String,
    categories: [subCategSchema]
});

const mainCategSchema = new Schema({
    name: String,
    page_description: String,
    id: String,
    categories: [categSchema]
}, {collection: 'categories'});


module.exports = mongoose.model('Category', mainCategSchema)