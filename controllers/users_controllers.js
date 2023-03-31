const User = require('../models/user')

module.exports.profile = function(req, res){
  console.log('User ID:', req.params.id);
  User.findById(req.params.id, function(err, user){
    console.log(user)
    if(err){
      console.log('error',err)
      return res.status(500).send(err)
    }
      return res.render('user_profile', {
          title: 'User Profile',
          profile_user: user
      });
  });

}



module.exports.update=async function(req,res){
 try{
  if(req.user.id == req.params.id){
    await User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
           req.flash('success', 'Updated!');
           return res.redirect('back');
    })
 }else{
               req.flash('error', 'Unauthorized!');
                return res.status(401).send('Unauthorized')
 }
 }catch(err){
  console.log('Error',err);
  return;
 }
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
      req.flash('error', 'Passwords do not match');
      return res.redirect('back')
    }
    User.findOne({email:req.body.email},function(err,user){
      // console.log({email:req.body.email})
      if(err){req.flash('error', err); return}

      if(!user){
        User.create(req.body,function(err,user){
            if(err){req.flash('error', err);return}
            return res.redirect('/users/sign-in')
        })
      }else{
        req.flash('success', 'You have signed up, login to continue!');
        return res.redirect('back');
    }

    })
 }

 //sign in and create the session for user
 module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfuly') ;
     return res.redirect('/');
 }

 module.exports.signout= function(req,res){
     
  req.logout((err)=>{
         if(err){
          console.log('err')
          return;
         }
         req.flash('success','Logged out Successfuly') 
         return res.redirect('/')
  });
}
