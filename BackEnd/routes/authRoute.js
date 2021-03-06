const express = require("express");
const passport = require("passport");
const authRoute = express.Router();
const jwt = require('jsonwebtoken')

authRoute.get('/login/google', passport.authenticate('google', { scope:
    [ 'profile', 'email' ] })
)

authRoute.get(
    "/google/callback",
    passport.authenticate("google", {
      failureMessage: "Cannot login to Google, please try again later!",
      failureRedirect: `${process.env.NEXTAUTH_URL}/auth/failure`,
      successRedirect: `${process.env.NEXTAUTH_URL}/auth/success`,
    }),
    (req, res) => {
      console.log("User: ", req.user);
      res.send({ User: req.user });
    }
  );

authRoute.post("/sign", async (req, res)=>{
  
  const alreadyExistsUser = await User.findOne({ email: req.body.email })
  console.log(alreadyExistsUser)
  if (alreadyExistsUser) {
    return res.status(409).json({ emailErr: "لقد تم التسجيل بهذا الايميل من قبل" });
  }

  const newUser = new User({ 
    name: req.body.name,
    email: req.body.email, 
    isAdmin: false, 
    password: req.body.password });
  const user = await newUser.save().catch((err) => {
    console.log("Error: ", err);
    res.status(500).json({ err });
  });
  const jwtToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn : 60* 60* 24* 3 }
  );
  res.cookie('jwt', jwtToken, {httpOnly : true, maxAge : 60* 60* 24 * 3 * 1000});
  res.status(200).send({ success: true });
})

authRoute.post("/loginAPI", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne( { email })
  if (!user)
    return res
      .status(400)
      .json({ failure: "البيانات خاطئة ، أعد المحاولة" });

  const userLog = await User.loginAPI(email, password).catch(error=>{
    console.log(error);
    return res.status(400).json({ failure: "البيانات خاطئة ، أعد المحاولة" });
  })

  const jwtToken = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn : 60* 60* 24* 3 }
  );
  res.cookie('jwt', jwtToken, {httpOnly : true, maxAge : 60* 60* 24 * 3 * 1000});
  res.status(200).send({ success: true });
});

  
authRoute.get('/logout',  (req, res)=>{
    res.cookie('session', '', { maxAge: 0.0001 });
    res.cookie('session.sig', '', { maxAge: 0.0001 });
    res.cookie('jwt', process.env.JWT_SECRET, { maxAge: 0.0001 });

    res.redirect('/auth/login')
})

authRoute.get('/user', (req, res)=>{
  if ( req.user ){
    return res.status(200).json(req.user)
  }
  jwt.verify(req.cookies.jwt,process.env.JWT_SECRET, async (err, decodedToken)=>{
        if ( err ){
          console.log(err);
          res.status(400).send({err: "UnAuthenticated"})
        }else{
          const user = await User.findOne({email: decodedToken.email}).catch(err => console.log(err));
          res.status(200).json(user)
        }
  })
})

module.exports = authRoute;