import { Product } from '../../../models/product';
export const resolvers = {
    Query : {
        getProducts : async () =>{
           const products = await Product.find()
             return products
        }
             /* () => {
                 
                 return [
                    {
                        id: 'hoh',
                        price : 106, 
                        times_ordered : 2,
                        name : 'Cahker',
                        category: 'slow',
                        images: [
                            {
                                path: '/zaaterchemise.jpg',
                                color: 'blue'
                            },
                            {
                                path: '/zaaterchemise.jpg',
                                color: 'red'
                            }
                        ]
                    }
                 ] 
        
             }*/
    }
}