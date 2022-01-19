const express = require("express");
const next = require("next");
const cors = require('cors');
const helmet = require('helmet');
const authRoute = require("./routes/authRoute");
const passport = require('passport')
const cookieSession = require("cookie-session");
const Connect = require('./utils/dbConnect');
const cloudinary = require( 'cloudinary').v2;

const { ApolloServer } = require("apollo-server-express");
const  typeDefs  = require('./schemas');
const  resolvers  = require('./resolvers');

const isAdmin = require('./middleware/isAdmin');

const PORT = process.env.PORT || 3000 ;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();


app
  .prepare()
  .then( async() => {
    const server = express();
    server.use(cors({ origin: "http://localhost:3000", credentials: true }));
    // DB Connection
    Connect()
      .then( ()=>{
        server.listen(PORT, () => {
            console.log(`> Ready on ${PORT}`);
          });
      })
      .catch( err => console.log(err) );

    // basic express  
    /* server.use(helmet()); */
    server.use(express.json({limit: '25mb'}));
    server.use(express.urlencoded({extended: true, limit: '25mb'}));
    
    //Apollo for GrapqhQL
    const apollo_server = new ApolloServer({
        typeDefs,
        resolvers
      });
    await apollo_server.start();
    apollo_server.applyMiddleware({app: server, path: "/api/graphql"});
    
    // Cookies for auth
    server.use(
      cookieSession({
        maxAge: 24 * 60 * 60 * 1000 * 2,
        keys: ['never get here'],
      })
    );
    //Passport
    require("./utils/passportGoogle");
    server.use(passport.initialize());
    server.use(passport.session());
    server.use('/auth',authRoute);

    // cloudinary for Image storing
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_SECRET,
      secure: true,
      color: true
    });
    server.get("/admin*", isAdmin, (req, res) => {
      return handle(req, res);
    })
    server.get("*", (req, res) => {
      return handle(req, res);
    });
  })
  .catch((ex ) => {
    console.error(ex.stack);
    process.exit(1);
  });