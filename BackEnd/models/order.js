import mongoose from 'mongoose';
import { Product } from './product.js';

const orderSchema = new mongoose.Schema({
    product : {
       type: Product.schema,
       default:{}
    },
    quantity : {
        type : Number,
        min: 1,
    }
    
})
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
