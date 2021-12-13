import { Product } from '../models/product';
import { Category } from '../models/category';
import { Order } from '../models/order';

import cloudinary from 'cloudinary'
export const resolvers = {
    Query : {
        getProducts : async () =>{
           const products = await Product.find().limit(5);
           console.log(products)
             return products
        },
        getCategories : async ()=>{ 
            const result = await Category.find()
            return result
        },
        /* getOrders : async ()=>{
            const result = await Category.find()
            return result
        } */
            
    },
    Mutation : {
        createProduct: async ( parent, args) => {
            const newProdcut = new Product({
                name : args.name,
                price : args.price,
                category : args.category,
                images : args.images,
                description: args.description,
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
            await cloudinary.v2.uploader.destroy(args.publicid);
            return res
        },
        createCategory: async (parent, args) =>{
            const newCategory = new Category({
                name : args.name,
                arabic: args.arabic
            });
            const res = await newCategory.save();
            return res
        },
        uploadImage: async (parent, args)=>{
            var data = [];
            for( let i = 0; i < args.files.length ; i++){
                const result = await cloudinary.v2.uploader.unsigned_upload(args.files[i], "jvqgsgcl", { public_id: `${args.public_id}${i}` });
                data.push({
                    path: result.secure_url,
                    color: result.colors[0][0]
                })
            }
            return  data 
        },
        /* createOrder: async (parent, args)=>{
            return
        } */
    }
}