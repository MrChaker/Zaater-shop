import { ApolloServer } from 'apollo-server-micro';
import {typeDefs} from '../../BackEnd/schemas/index';
import {resolvers} from '../../BackEnd/resolvers/index';
import Connect from '../../BackEnd/utils/dbConnect';
import cloudinary from 'cloudinary';
Connect();

const apollo_server = new ApolloServer({	
                       typeDefs, 
                       resolvers
                      });
const startServer = apollo_server.start();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
  color: true
});

export const config = {
    api: {
      bodyParser: false,
    },
  }

export default async function handler(req, res){
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }
    await startServer;
    await apollo_server.createHandler({
        path: '/api/graphql',
    })(req, res)
}
