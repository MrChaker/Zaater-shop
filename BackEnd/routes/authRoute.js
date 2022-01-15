const express = require("express");
const passport = require("passport");
const authRoute = express.Router();

authRoute.post('/login', passport.authenticate() , (req, res)=>{
    
})

authRoute.post('/signup', passport.authenticate() , (req, res)=>{
    
})

module.exports = authRoute;