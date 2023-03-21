const User = require('../models/user')
const passport = require('passport')
module.exports.profile =  function(req,res){
    
                return res.render('users',{
                  title:"dev surii profile"
                });
}


//render the sign up page
module.exports.signup = function(req,res){
     if(req.isAuthenticated()){
       return res.redirect('/users/profile')
     }
     return res.render("user_sign_up",{
      title:"codeial ! sign up"
     })
}

//render the sign in page
module.exports.signin = function(req,res){
  if(req.isAuthenticated()){
   return res.redirect('/users/profile')
  }
  return res.render("user_sign_in",{
   title:"codeial ! sign in"
  })
 }


 //get the signup data
 module.exports.create = function(req,res){
    if (req.body.password != req.body.confirm_password){
      return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
      // console.log({email:req.body.email})
      if(err){console.log('error in finding user in signing up'); return}

      if(!user){
        User.create(req.body,function(err,user){
            console.log(req.body)
            if(err){console.log('error in creatign while signinup up');return}
            return res.redirect('/users/sign-in')
        })
      }

    })
 }

 //sign in and create the session for user
 module.exports.createSession = function(req,res){
       return res.redirect('/');
 }

 module.exports.signout= function(req,res){
        req.logout(function(err){
          if(err){
            console.log(err)
          }
        });
     return res.redirect('/')
 }