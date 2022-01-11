const  mongoose = require('mongoose');

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
module.exports = Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
