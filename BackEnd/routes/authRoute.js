const express = require("express");
const passport = require("passport");
const authRoute = express.Router();


authRoute.get('/login/google', passport.authenticate('google', { scope:
    [ 'profile', 'email' ] })
)

authRoute.get(
    "/google/callback",
    passport.authenticate("google", {
      failureMessage: "Cannot login to Google, please try again later!",
      failureRedirect: "http://localhost:3000/auth/failure",
      successRedirect: "http://localhost:3000/auth/success",
    }),
    (req, res) => {
      console.log("User: ", req.user);
      res.send({ User: req.user });
    }
  );

authRoute.get('/logout',  (req, res)=>{
    res.cookie('session', '', { maxAge: 0.0001 });
    res.cookie('session.sig', '', { maxAge: 0.0001 });

    res.redirect('/auth/signup')
})

authRoute.get('/user', (req, res)=>{
  if ( req.user ){
    res.json(req.user)
  }
})

module.exports = authRoute;