import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name : String,
    arabic : String
},{ timestamps : true })

export const Category = mongoose.model.Category || mongoose.model('Category', CategorySchema);
