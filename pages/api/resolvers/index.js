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
            return result
        }
            
    },
    Mutation : {
       
        updateProduct: async ( parent, args )=>{
            const res = await Product.findByIdAndUpdate( args.id , { times_ordered : args.to });
            return res;
        }
    }
}