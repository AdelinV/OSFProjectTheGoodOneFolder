const express = require('express');
const router = express.Router();
const _ = require('underscore')
const Category = require('../models/category');

//  router.get('/', function(req, res, next){
//      Category.find({}, function(items){
//          console.log("");
//          res.render('index');
//      });

//  });

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

//  router.get("/:category", function(req, res) {
//      //const id = req.params.category;
//      Category.find({"id": req.params.category}, function(err, items) {
//          console.log(items[0].categories[0]);
//          res.render('../views/Categories.ejs', {
//              result: items[0].categories
//          });
//      });
//  });

   router.get("/:category", function(req, res) {
    const Category = require('../models/category');
      Category.findOne({"id": req.params.category}, function(err, items) {
          console.log(items.categories);
        res.render("../views/Categories.ejs", {
            // Underscore.js lib
                     _     : _ ,  
            // Template data
            title:'My osf project',
           items:items.categories[0],
            active: true
        });
        console.log(items);
      
      });
  });



module.exports = router;