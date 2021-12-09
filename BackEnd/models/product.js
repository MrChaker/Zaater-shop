import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    name:String,
    images:[{
        path:String,
        color:String,
        img:{
            data: Buffer,
            contentType: String
        }
    }],
    price:Number,
    times_ordered:Number,
    category:String

},{ timestamps :true})

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
