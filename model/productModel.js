const mongoose = require("mongoose");
const { stringify } = require("querystring");


const productSchema = new mongoose.Schema({
id : {
    type : Number,
    require : true
},
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
stock : {
    type : Number
},
brand  : {
    type : String,
    required : [true,"brand is required field"]
},
category : {
    type : String,
    required : [true,"category is required field"]

},
thumbnail :{
    type : String
},
images : {
    type : [String]
}
});

const Product =  mongoose.model('Product',productSchema);

module.exports = Product
     