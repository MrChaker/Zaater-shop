import mongoose from 'mongoose';



const connection = {}

export default async function Connect(){
    if(connection.isConnected){
        return
    }
    const db = await mongoose.connect('mongodb://Chaker:17102001cH@cluster0-shard-00-00.xydo5.mongodb.net:27017,cluster0-shard-00-01.xydo5.mongodb.net:27017,cluster0-shard-00-02.xydo5.mongodb.net:27017/Zaater-shop?ssl=true&replicaSet=atlas-q1pwjr-shard-0&authSource=admin&retryWrites=true&w=majority',{ 
        useUnifiedTopology: true,
        useNewUrlParser : true
    });
    
    connection.isConnected = db.connection.readyState
    console.log(db.connection.readyState);
    console.log(process.env.MONGO_URI)
    
    
}
