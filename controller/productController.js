const Product = require('../model/productModel');

exports.getAllproduct = async (req, res) => {
    try {
        const brand = req.body;
        console.log(brand,"= kkk");
        const products = await Product.find();
        console.log(products,"=jkl");
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

exports.createProduct = async (req, res) => {
    try {
        console.log("abc");
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
            message : error.message
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

// Create  all category //
