const User = require('../models/user')
module.exports.profile =  function(req,res){
      if(req.cookies.user_id){
            User.findById(req.cookies.user_id, function(err,user){
              if(user){
                return res.render('users',{
                  title:"dev surii profile",
                  user:user
                });
              }
              return res.redirect('/users/sign-in')
            });
      }else{
        return res.redirect('/users/sign-in')
      }
      
   }


//render the sign up page
module.exports.signup = function(req,res){
 return res.render("user_sign_up",{
  title:"codeial ! sign up"
 })

}

//render the sign in page
module.exports.signin = function(req,res){
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
  //steps to authenticate
  //find the user
    User.findOne({email:req.body.email}, function(err,user){
      if(err){console.log('error in finding user in signing in'); return}
      //handle user found

      if(user){
         
          // handle password which dont match
          console.log(user.password)
           if(user.password != req.body.password){
            console.log('its failed')
            return res.redirect('/')
           }

           // handle session creation 
           res.cookie('user_id' , user.id)
           return res.redirect('/users/profile')

      }else{
         // handle user not found
         console.log('user not found')
        
           return res.redirect('/')
          
      }


    })
 }

 module.exports.signout= function(req,res){
        res.clearCookie('user_id')
     return res.redirect('/users/sign-in')
 }