const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `${process.env.NEXTAUTH_URL}/auth/google/callback`,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      console.log('logging...');
      User.find({googleId: profile.id }, async (err, data)=>{
        if ( !data || data.length == 0 ){
          const newUser = new User({
            name: `${profile.name.givenName} ${profile.name.familyName}`,
            email: profile.emails[0].value,
            image: profile.photos[0].value,
            googleId: profile.id,
            isAdmin: false
          });
          console.log('saved..');
    
          newUser.save((err)=>{
            if (err) console.log('save err: ' + err)
            console.log(newUser)
            return cb(err, newUser)
          }
          )
        }else{
            console.log(data[0]);
            return cb(err, data[0])
        }
      }) 
    }) 
  
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  const user = await User.find({ id }).catch((err) => {
    console.log("Error deserializing", err);
    cb(err, null);
  });

  if ( user && user.length > 0 ) cb(null, user[0]);
});