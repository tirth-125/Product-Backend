const express = require("express");
const ProductController = require("../controller/productController");
const middleWare = require("../middleware/valid");
const axios = require("axios");
const { response } = require("../app");
const cron = require("node-cron");
const Product = require("../model/productModel");

// Use of Axios 

// async function getAllProduct(){
//         try {
//             const res = await axios.get("https://dummyjson.com/products");
//             console.log(res.data," = Product");
//             res.save();     
//         } catch (error) {
//             console.log(error);
//         }
// }
//     await save(getAllProduct());
// axios.get("https://dummyjson.com/products").then((response)=>{
//     console.log(response.data);
// }).catch((err)=>{
//     console.log(err.response);
// });

async function abc() {

    try {
        const formData = {
            title: '3D  Lamp',
            description: '3D led lamp sticker Wall sticker 3d wall art light on/off button  cell opend (included)',
            price: 50,
            discountPercentage: 18.49,
            rating: 5,
            stock: 60,
            brand: 'LED Lights',
            category: 'home-decoration',
            thumbnail: 'https://cdn.dummyjson.com/product-images/28/thumbnail.jpg',
        }
        const res = await axios.post("https://dummyjson.com/products/add", formData)
        console.log(res.data, "check responce");

    } catch (error) {
        console.log(error);
    }
}

// abc();
// *********************
const router = express.Router();


// Axios Route
router.route('/getCrete').post(ProductController.getProduct);
// router.route('/newproduct').post(ProductController.newProduct);

// router.route('/').get(ProductController.getAllproduct);
router.route('/').post(ProductController.createProduct);

router.route('/:id').patch(ProductController.updateProduct);
router.route('/:id').delete(ProductController.deleteProduct);




module.exports = router;