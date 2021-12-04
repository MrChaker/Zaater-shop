import { ApolloServer } from 'apollo-server-micro';
import {typeDefs} from '../../BackEnd/schemas/index';
import {resolvers} from '../../BackEnd/resolvers/index';
import Connect from '../../BackEnd/utils/dbConnect';
Connect();

const apollo_server = new ApolloServer({	
                       typeDefs, 
                       resolvers
                      });
const startServer = apollo_server.start();

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
