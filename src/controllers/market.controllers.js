import mongoose from "mongoose";
import { Product } from '../models/product.model.js'

export const listProducts = async(req,res)=>{
    try {
        const products = await Product.find();
        console.log('Products found:', products);
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}