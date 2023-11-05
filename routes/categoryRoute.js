
import express from 'express';
const router = express.Router();

import { createCategory, getAllCategories, updateCategory ,  deleteCategory } from "../cotroller/categoryController.js"



router.post('/categories', createCategory);
router.get('/categories', getAllCategories);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);

export  {router}
