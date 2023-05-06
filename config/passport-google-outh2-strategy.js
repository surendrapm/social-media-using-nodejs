const passport = require('passport')
const googleStrategy = require('passport-google-oauth').OAuth2Strategy
const crypto = require('crypto')
const User = require('../models/user')//tell pasport use a new strategy for google login
passport.use(new googleStrategy({
    clientID:"837025674173-rt627nq3n0bbcq27bqipf03mggimg2c7.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:4000/users/auth/google/callback",
   },

   function(accessToken , refreshToken , profile, done ){
     User.findOne({email:profile.emails[0].value}).exec(function(err,user){
        if(err){console.log("error in google startegy-passport",err); return;}
        console.log(accessToken, refreshToken);
        console.log(profile);

        if(user){
            //if found set this as req.user
            return done(null,user);
        }else{
            User.create({
                //if user is not found i.e new user set it as req.user
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }, function(err){
                if(err){console.log("error in creating user",err); return;}

                return done(null,user)
            })
        }

     })
   }

))

module.exports=passport