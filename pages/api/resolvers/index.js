import { Product } from '../../../models/product';
import { Category } from '../../../models/category';

export const resolvers = {
    Query : {
        getProducts : async () =>{
           const products = await Product.find()
             return products
        },
        getCategories : async ()=>{
            const result = await Category.find();
            console.log(result)
            return result
        }
             
    }
}