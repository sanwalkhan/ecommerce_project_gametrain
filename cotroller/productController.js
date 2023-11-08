import Product from "../model/productModel.js";

// product creation

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, category, image, brand, quantity } =
      req.body;
    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !image ||
      !brand ||
      !quantity
    ) {
      return res.status(400).json({ message: "All Fields Are Mandatory" });
    }

    const newProduct = new Product({
      title,
      description,
      price,
      category,
      image,
      brand,
      quantity,
    });

    await newProduct.save();

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  GETTING ALL PRODUCTS

export const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find()
    if (Product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product

export const updateSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (product) {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   // DELETE PRODUCT

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({ message: `Deleted ${product.title}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE PRODUCT
// WE CAN GET QUANTITY , BRAND NAME ,AND PRODUCT DETAILS BY THIS SINGLE API JUST BU USING PRODUCTID ID WILL GIVE COMPLETE DETAIL

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(400).json({ message: "Product not found! Internal error" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// get quantity 
export const getProductQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const productQuantity = product.quantity;

    res.status(200).json({ quantity: productQuantity });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// get brand name

export const getProductsByBrand = async (req, res) => {
  try {
    const brandName = req.params.brandName;
    const products = await Product.find({ brand: brandName });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found for the brand' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};