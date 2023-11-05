import express from 'express';
const router = express.Router();

import { createProduct, getAllProducts, getSingleProduct , updateSingleProduct, deleteProduct, getProductQuantity , getProductsByBrand } from "../cotroller/productController.js";


router.post("/product", createProduct); 
router.get("/product", getAllProducts); 
router.get("/product/:id" , getSingleProduct);
router.put("/product/:id" , updateSingleProduct);
router.delete("/product/:id" , deleteProduct);

router.get('/product/:id/quantity', getProductQuantity);

router.get('/product/brand/:brandName', getProductsByBrand);

export  {router}