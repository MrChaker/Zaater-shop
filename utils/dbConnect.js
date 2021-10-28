import mongoose from 'mongoose';
import { Product } from '../models/product';


const connection = {}

export default async function Connect(){
    if(connection.isConnected){
        return
    }
    const db = await mongoose.connect(process.env.MONGO_URI,{ 
        useUnifiedTopology: true,
        useNewUrlParser : true
    });
    console.log('connected..')
    connection.isConnected = db.connection.readyState
    console.log(db.connection.readyState);
    console.log(db.models)
    
    
}
