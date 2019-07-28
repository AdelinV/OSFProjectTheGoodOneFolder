const express = require('express');
const router = express.Router();
const _ = require('underscore');
const Category = require('../models/category');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://User:Adelin99@adelindb-xjpyf.mongodb.net/Project?retryWrites=true&w=majority', { useNewUrlParser: true });

router.get("/:category", function(req, res) {
  if (Object.keys(req.params).length == 1) {
   Category.findOne({"id": req.params.category}, function(err, items) {
     res.render("../views/Categories", {
         // Underscore.js lib
                  _   : _ ,  
         // Template data
       items: items, 
       active: true
     });
   }); 
  }    
});

router.get("/:category/:subcategories", function(req, res) {
  if (Object.keys(req.params).length == 2) {
    Category.findOne({"id": req.params.category}, function(err, items) {
      for(var i = 0; i < items.categories.length; i++) {
        if(items.categories[i].id == req.params.subcategories) {
          var subCatItems = items.categories[i];
          console.log(Object.keys(req.params).length);
          res.render("../views/SubCategories", {
            // Underscore.js lib
                     _   : _ ,  
            // Template data
            items: subCatItems,    
            active: true
          });
        }
      }
    });
  }
});

router.get("/:category/:subcategories/:productCat", function(req, res) {
  if (Object.keys(req.params).length == 3) {
    var  ProductCategory = require('../models/product');
    ProductCategory.find({primary_category_id: req.params.productCat}, function(err, items) {
      res.render("../views/Products", {
        // Underscore.js lib
                 _   : _ ,  
        // Template data
        items: items,     
        active: true
      });
    });
  }
});

router.get("/:category/:subcategories/:productCat/:productDes", function(req, res) {
  if (Object.keys(req.params).length == 4) {
    var  ProductCategoryDes = require('../models/product');
    ProductCategoryDes.find({id: req.params.productDes}, function(err, items) {
      console.log(items);
      res.render("../views/ProductsDes", {
        // Underscore.js lib
                 _   : _ ,  
        // Template data
        items: items,    
        active: true
      });
    });
  }
});

module.exports = router;
