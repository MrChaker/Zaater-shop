import mongoose from 'mongoose';



const connection = {}

export default async function Connect(){
    if(connection.isConnected){
        return
    }
    const db = await mongoose.connect(process.env.MONGO_URI,{ 
        useUnifiedTopology: true,
        useNewUrlParser : true
    });
    
    connection.isConnected = db.connection.readyState
    console.log(db.connection.readyState);
    console.log(process.env.MONGO_URI)
    
    
}
