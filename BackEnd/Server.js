const express = require("express");
const next = require("next");

const Connect = require('./utils/dbConnect');
const cloudinary = require('cloudinary');

const { ApolloServer } = require("apollo-server-express");
const  typeDefs  = require('./schemas');
const  resolvers  = require('./resolvers');

const PORT = process.env.PORT || 8000 ;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure: true,
    color: true
  });

app
  .prepare()
  .then( async() => {
    const server = express(); 
    Connect()
      .then( ()=>{
        server.listen(PORT, () => {
            console.log(`> Ready on ${PORT}`);
          });
      })
      .catch( err => console.log(err) );
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));

    const apollo_server = new ApolloServer({
        typeDefs,
        resolvers
      });
    await apollo_server.start();
    apollo_server.applyMiddleware({app: server, path: "/api/graphql"});
    /* server.use("/api", routes(server)); */

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    
  })
  .catch((ex ) => {
    console.error(ex.stack);
    process.exit(1);
  });