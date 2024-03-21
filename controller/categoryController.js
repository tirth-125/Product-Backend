const Product = require('../model/productModel');

exports.createCategory = async(req,res)=>{
    try {
        const newCategory = await Product.create(req.body.category);
        res.status(200).json({
            success : true,
            length : newCategory.length,
            data : {
                newCategory
            }
        })
    } catch (error) {
        res.status(400).json({
            success : false,
            message : error.message
        });
    }
    
}