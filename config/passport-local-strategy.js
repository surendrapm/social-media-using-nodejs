const User = require('../models/user')

const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;
//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
},
 function(email, password , done){
    User.findOne({email:email},function(err,user){
         if(err){
            console.log('error in finding user --> passport')
            return done(err)
         }        
           if(!user || user.password != password){
             console.log('invalid user/password');
             return done(null,false);
           }
           return done(null,user)
    });
 }
))

// serializing the user to decide which key is to kepr in the cookies

passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialize the user from the key in cookies

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error  in finding user --> passport');
            return done(err)
        }

        return done(null, user);
    })
})

// check if the user is authenticated 
passport.checkAuthentication =function(req,res,next){
    // if the user is signed in, then pass on the request to the next function(controllers action)
    if(req.isAuthenticated()){
        return next()
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in')
}


passport.setAuthenticatedUser = function(req,res,next){
    if (req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we ar just sending this to the local for 
        //veiws
        res.locals.user = req.user
       
    }
    next()
}


module.exports=passport;