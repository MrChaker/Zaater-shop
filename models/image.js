import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    
        data: Buffer,
        contentType: String
    
})