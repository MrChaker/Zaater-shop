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
        createProduct: async ( parent, args) => {
            const newProdcut = new Product({
                name : args.name,
                price : args.price,
                category : args.category,
                images : args.images,
                times_ordered : 0
            });
            const res = await newProdcut.save();
            return res
        },
        updateProduct: async ( parent, args )=>{
            const res = await Product.findByIdAndUpdate( args.id , { times_ordered : args.to });
            return res;
        },
        deleteProduct : async (parent, args) => {
            const res = await Product.findByIdAndDelete(args.id);
            return res
        },
        createCategory: async (parent, args) =>{
            const newCategory = new Category({
                name : args.name,
                arabic: args.arabic
            });
            const res = await newCategory.save();
            return res
        }
    }
}