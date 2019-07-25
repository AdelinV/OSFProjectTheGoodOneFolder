const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.get('/', function(req, res, next){
    Category.find({}, function(items){
        console.log("");
        res.render('index');
    });

});

// router.post('/', (req, res, next) => {
//     const category = {
//         name: req.body.name,
//         price: req.body.price
//     };
//     res.status(201).json({
//         message: "handling POST requests to /cateogories",
//         createdCategory: category
//     });

// });

 router.get("/:category", function(req, res) {
     //const id = req.params.category;
     Category.findOne({_id: req.params.category}, function(err, items) {
         console.log(items[0].categories[0]);
         res.render('../views/Categories.ejs', {
             object: items[0].categories
         });
     });
 });

module.exports = router;