import { gql } from 'apollo-server-micro';
import { Product } from '../models/product'

export const typeDefs = gql`
    type ImageType {
        path: String,
        color:String
    }

    type ProductType{
        id :String,
        price : Int,
        times_ordered : Int,
        name : String,
        category: String,
        images: [ImageType]
    }
    type Query{
        getProducts: [ProductType]
    }
`
export const resolvers = {
    Query : {
        getProducts : async () =>{
           const products = await Product.find()
           console.log(products)
             return products
        } 
             /* ()=>
        [
            {
            id: 'hoh',
            price : 106, 
            times_ordered : 2,
            name : 'Cahker',
            category: 'slow',
            images: [
                {
                    path: '/images/zaaterchemise.jpg',
                    color: 'blue'
                }
            ]
            }
    ] */
        
    }
}
