import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  brand : {
    type: String,
  },
  quantity : {
    type: Number,
  }
}); 

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;
