const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.get('/', function(req, res, next){
    Category.find({}, function(items){
        console.log("GAAAY");
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

router.get("/:category", function(req, res, next) {
    //const id = req.params.category;
    Category.find({"id": req.params.category}, function(err, doc) {
        console.log(doc[0].categories);
        res.render('../views/Categories.ejs', {
            result: doc[0].categories
        });
    });
});

module.exports = router;