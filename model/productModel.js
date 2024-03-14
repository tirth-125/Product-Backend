const mongoose = require("mongoose");
const { stringify } = require("querystring");

const productSchema = new mongoose.Schema({
//     {
//     
//         "title": "iPhone 9",
//         "description": "An apple mobile which is nothing like apple",
//         "price": 549,
//         "discountPercentage": 12.96,
//         "rating": 4.69,
//         "stock": 94,
//         "brand": "Apple",
//         "category": "smartphones",
//         "thumbnail": "...",
//         "images": ["...", "...", "..."]
//       }

title : {
    type : String,
    required : [true,"title is required field"]
},
description : {
    type  : String,
    required : [true,"description is required field"]
},
price : {
    type : Number,
    required : [true,"price is required field"]
},
discountPercentage : {
    type : Number
},
rating : {
    type : Number,
    required : [true,"rating is required field"]
},
brand  : {
    type : String,
    required : [true,"brand is required field"]

},
category : {
    type : String,
    required : [true,"category is required field"]

},
// thumbnail : {

// },
// images : {

// }
});

const Product =  mongoose.model('Product',productSchema);

module.exports = Product;