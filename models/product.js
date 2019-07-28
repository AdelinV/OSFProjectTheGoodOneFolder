var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mainProductSchema = new Schema({
    name: String,
    long_description: String,
    id: String,
}, {collection: 'products'});

module.exports = mongoose.model('Product', mainProductSchema);