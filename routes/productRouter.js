const express = require("express");
const ProductController = require("../controller/productController");
const middleWare =  require("../middleware/valid");

const router = express.Router();

router.route('/').get(ProductController.getAllproduct);
router.route('/').post(ProductController.createProduct);


router.route('/:id').patch(ProductController.updateProduct);
router.route('/:id').delete(ProductController.deleteProduct);




module.exports = router;