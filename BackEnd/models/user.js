const  mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String,
    googleId: String,
    isAdmin: Boolean
})
module.exports = User = mongoose.models.User || mongoose.model('User', UserSchema);
