const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name : String,
    arabic : String
},{ timestamps : true })

module.exports = Category = mongoose.model.Category || mongoose.model('Category', CategorySchema);
