import Category from '../model/categoryModel.js'

// Create 

export const createCategory = async(req, res)=>{
    try{
        const category = new Category(req.body);
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
    }

// // Get a list of all categories

export const getAllCategories =async (req, res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}



export const updateCategory = async(req, res)=>{
    try {
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCategory);
      } catch (error) {
        res.status(400).json({ message: error.message });
      } 
}

export const deleteCategory= async(req, res)=>{
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}
