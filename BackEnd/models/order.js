import mongoose from 'mongoose';
import { Product } from './product.js';

const orderSchema = new mongoose.Schema({
    products : [{
        product_id: String,
        name: String,
        price: Number,
        image: String,
        quantity: Number,
    }],
    buyer:{
        fullName: String,
        email: String,
        phone: String,
        adresse: String,
        city: String,
        postal_code: String
    },
    Total: Number    
})
export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
