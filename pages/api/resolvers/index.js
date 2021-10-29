
export const resolvers = {
    Query : {
        getProducts : /* async () =>{
           const products = await Product.find()
           console.log(products)
             return products
        } */
             () => {
                 
                 return [
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
                            },
                            {
                                path: '/images/zaaterchemise.jpg',
                                color: 'red'
                            }
                        ]
                    }
                 ]
        
             }
    }
}