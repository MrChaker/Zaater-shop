const  Product  = require( '../models/product');
const  Category  = require( '../models/category');
const  Order  = require( '../models/order');
const  User  = require( '../models/user');

const cloudinary = require( 'cloudinary');

module.exports =  resolvers = {
    Query : {
        getProducts : async (_, args) =>{
            if ( !args.Sort || args.Sort == "الاحدث"){
                console.log(args.search + " 55 ")
                const products = await Product.find({ name: {$regex:args.search,$options:"$i"} }).limit(25*args.page);
                return products
            }
            var products = [];
            switch(args.Sort){
                case "الاكثر طلباً":
                    products = await Product.find({ name: {$regex:args.search,$options:"$i"} }).sort({times_ordered : -1}).limit(25*args.page);
                    return products;
                case "الأغلى سعراً":
                    products = await Product.find({ name: {$regex:args.search,$options:"$i"} }).sort({price: -1}).limit(25*args.page);
                    return products;
                case "الأرخص سعراً":
                    products = await Product.find({ name: {$regex:args.search,$options:"$i"} }).sort({price: 1}).limit(25*args.page);
                    return products;    
            } 
        },
        /* searchProduct : async (_, args) =>{
            const products = await Product.find({name : args.text + /./g})  
            return products
        }, */
        getProduct : async (_, args) =>{
            const product = await Product.findById(args.id);  
            return product
         },
        getCategories : async ()=>{ 
            const result = await Category.find()
            return result
        },
        getOrders : async ()=>{
            const result = await Order.find()
            return result
        }
            
    },
    Mutation : {
        createProduct: async ( _, args) => {
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
        updateProduct: async ( _, args)=>{
            const res = await Product.findByIdAndUpdate( args.id , { times_ordered : args.to });
            return res;
        },
        deleteProduct : async (_, args) => {
            const res = await Product.findByIdAndDelete(args.id);
            await cloudinary.v2.uploader.destroy(args.publicid);
            return res
        },
        createCategory: async (_, args) =>{
            const newCategory = new Category({
                name : args.name,
                arabic: args.arabic
            });
            const res = await newCategory.save();
            return res
        },
        uploadImage: async (_, args)=>{
            var data = [];
            for( let i = 0; i < args.files.length ; i++){
                const result = await cloudinary.v2.uploader.unsigned_upload(args.files[i], "jvqgsgcl", { public_id: `${args.public_id}${i}` });
                console.log(result.colors[0][0]) 

                data.push({
                    path: result.secure_url,
                    color: result.colors[0][0]
                })
            }
            return  data 
        },
        createOrder: async (_, args)=>{
            const newOrder = new Order({
                products: args.products,
                buyer: args.buyer,
                Total: args.Total
            });
            const result = await newOrder.save();
            return result
        },
        createUser: async (_, args)=>{
            const newUser = new User({
                name: args.name,
                email: args.email,
                image: args.image
            })
            const result = await newUser.save();
            return result
        }
    }
}