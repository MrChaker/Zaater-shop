import { Product } from '../../../models/product';
import { Category } from '../../../models/category';
import mongoose from 'mongoose'
export const resolvers = {
    Query : {
        getProducts : async () =>{
           const products = await Product.find()
             return products
        },
        getCategories : async ()=>{
            
            const result = await Category.find();
            return result
        }
             
    }
}