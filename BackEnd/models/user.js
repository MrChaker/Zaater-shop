import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    image: String
})
export const User = mongoose.models.User || mongoose.model('User', UserSchema);
