const Product = require('../model/productModel');
const express = require("express");
// const app = express();
const axios = require("axios");
const cron = require("node-cron");


const getAllproduct = async (req, res) => {
    try {
        const brand = req.body;
        // console.log(brand, "= kkk");
        const products = await Product.find();
        console.log(products, "=jkl");
        res.status(200).json({
            status: "Success",
            // length : products.length,
            Data: {
                products
            }
        })

    } catch (error) {
        res.status(401).json({
            status: "Fail",
            message: error.message
        })
    }

}
// let job = cron.schedule(" * * * * * * ", getAllproduct);
// job.start();

// setTimeout(()=>{
//     job.stop();
//     console.log("Cron Job Stopped");
// },5*3600);




exports.createProduct = async (req, res) => {
    try {
       
        const newProduct = await Product.create(req.body);
        // console.log("abcdfg");

        console.log(newProduct);
        res.status(200).json({
            status: "success",
            Data: {
                newProduct
            }
        });
    } catch (error) {
        res.status(401).json({
            status: "Fail",
            message: error.message
        });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        // const id = req.params.id;
        // const 
        // console.log("abc");
        const productUpdate = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidator: true });
        // console.log("abcdef");
        res.status(204).json({
            status: "Success",
            data: {
                productUpdate
            }
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        const productDelete = await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "Success",
            message: "delete Product is  Successfuly"
        })
    } catch (error) {
        res.status(404).json({
            status: "Fail",
            message: error.message
        })
    }
}


// With use of Axios Get Product And Post Product
const getProduct = async (req, res) => {
    try {
        const ress = await axios.get("https://dummyjson.com/products");
        // console.log(ress.data.products, "=res");
        const product = ress.data.products;
        // console.log(product);
        // console.log("afg");
        const createProdcut = await Product.create(product);

        console.log(createProdcut, "cp");
        // console.log(product);

        // res.status(200).json({
        //     success: true,
        //     data: {
        //         createProdcut
        //     }
        // });
    } catch (error) {
        console.log(error);
        // res.status(400).json({
        //     success: true,
        //     message: error.message
        // });
    }
}

const newProduct = async (req, res) => {
    try {
        const data = [{
            id: 1,
            title: 'Realme 8',
            description: '6 gb ram and 128 gb rom and 56 mp camera',
            price: 20000,
            discountPercentage: 4.50,
            rating: 4.92,
            stock: 25,
            brand: 'Realme',
            category: 'home-decoration',
            thumbnail: 'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg',
            images: [
                'https://cdn.dummyjson.com/product-images/30/1.jpg',
                'https://cdn.dummyjson.com/product-images/30/2.jpg',
                'https://cdn.dummyjson.com/product-images/30/3.jpg',
                'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg'
            ],
        },
            {
            id: 2,
            title: 'Realme 9',
            description: '8 gb ram and 256 gb rom and 65 mp camera',
            price: 25000,
            discountPercentage: 4.50,
            rating: 4.92,
            stock: 10,
            brand: 'Realme',
            category: 'home-decoration',
            thumbnail: 'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg',
            images: [
                'https://cdn.dummyjson.com/product-images/30/1.jpg',
                'https://cdn.dummyjson.com/product-images/30/2.jpg',
                'https://cdn.dummyjson.com/product-images/30/3.jpg',
                'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg'
            ],
        },
        {
            id: 3,
            title: 'Realme 10',
            description: '8 gb ram and 256 gb rom and 60 mp camera',
            price: 30000,
            discountPercentage: 4.50,
            rating: 4.92,
            stock: 10,
            brand: 'Realme',
            category: 'home-decoration',
            thumbnail: 'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg',
            images: [
                'https://cdn.dummyjson.com/product-images/30/1.jpg',
                'https://cdn.dummyjson.com/product-images/30/2.jpg',
                'https://cdn.dummyjson.com/product-images/30/3.jpg',
                'https://cdn.dummyjson.com/product-images/30/thumbnail.jpg'
            ],
        }
        ]
        
        const newproduct = await axios.post("http://127.0.0.1:4000/api/v1/product/", data);            
        console.log(newproduct," = product");
        // res.status(200).json({
        //     success : true,
        //     message : "Data Create Successfully"
        // });
    } catch (error) {
        console.log(error);
        // res.status(400).json({
        //     success : false,
        //     message : error.message
        // });
    }   
}

const allTasks = async ()=>{
    getProduct();
    newProduct();
}
let job = cron.schedule(" * * * * * ",allTasks);
job.start();