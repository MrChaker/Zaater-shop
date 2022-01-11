const  mongoose = require('mongoose');

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
    category:String,
    description: String

},{ timestamps :true})

module.exports = Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
