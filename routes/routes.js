import express from 'express';
const router = express.Router();

import { createProduct, getAllProducts, getSingleProduct , updateSingleProduct, deleteProduct, getProductQuantity , getProductsByBrand } from "../cotroller/productController.js";
import { registerUser , login, updatePassword, getAllUsers  , getSingleUser, updateSingleUser , deleteUser } from '../cotroller/userController.js';


// user routes

router.post("/user/register", registerUser)
router.post("/user/login", login)
router.get("/user/allusers", getAllUsers)
router.get('/user/:id', getSingleUser);
router.put("/user/:id" , updateSingleUser);
router.delete("/product/:id" , deleteUser);
router.post("/user/updatepassword", updatePassword)




// Product Routes


router.post("/product", createProduct); 
router.get("/product", getAllProducts); 
router.get("/product/:id" , getSingleProduct);
router.put("/product/:id" , updateSingleProduct);
router.delete("/product/:id" , deleteProduct);

router.get('/product/:id/quantity', getProductQuantity);

router.get('/product/brand/:brandName', getProductsByBrand);

export {router}