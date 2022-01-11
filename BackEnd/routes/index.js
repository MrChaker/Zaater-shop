const express = require("express");
const router = express.Router();


function routes( app ){
    
    router.get("/", async (req, res) => {
        console.log("graphql")
         

        res.end("Welcome to the depth of the ocean");

    } )
    return router
};

module.exports = routes;