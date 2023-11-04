import ProductModel from "../model/productModel";

export const createProduct = async(req, res)=>{
    try{
        const { title, description, price, category, image } = req.body;
        if (!title || !description || !price || !category || !image) {
            return res.status(400).json({ message: "All Fields Are Mandatory" });
          }
      
          const newProduct = new Product({
            title,
            description,
            price,
            category,
            image
          });

          await newProduct.save();

          res.status(200).json(newProduct)

    }
    catch(error){   
        res.status(500).json({message : error.message})

    }
}