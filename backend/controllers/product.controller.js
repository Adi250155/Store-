import mongoose, {isValidObjectId} from "mongoose"
import Product from "../models/product.model.js";

const getProducts = async(req,res) => {
       const products =await Product.find({});

       return res.status(200).json(
        {
            success:true,
            data:products,
        }
       )
}
const createProducts = async(req,res) => {
    const product=req.body
    if(!product.name || product.price===undefined || !prroduct.image){
        return res.status(400).json({
			success: false,
			message: "Please provide all fields",
		});
    }

    const newProduct = new Product(product);
    await newProduct.save();
    return res.status(201).json({
		success: true,
		data: newProduct,
	})
}
const updateProducts = async(req,res) => {
     const {id}=req.params
     const product =req.body

      if (!isValidObjectId(id)) {
        return res.status(400).json({
			success: false,
			message: "Invalid Product Id",
		})
    }

   const updatedProduct = await Product.findByIdAndUpdate(
		id,
		product,
		{
			new: true,
			runValidators: true,
		}
	);

	if (!updatedProduct) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	return res.status(200).json({
		success: true,
		data: updatedProduct,
	});
}
const deleteProducts = async(req,res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(400).json({
			success: false,
			message: "Invalid Product Id",
		})
    }

    const deletedProduct = await Product.findByIdAndDelete(id);

	if (!deletedProduct) {
		return res.status(404).json({
			success: false,
			message: "Product not found",
		});
	}

	return res.status(200).json({
		success: true,
		message: "Product deleted",
	});
}

export {
    getProducts,
    createProducts,
    updateProducts,
    deleteProducts,
}