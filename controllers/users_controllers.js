const User = require('../models/user')
const crypto=  require('crypto')
const sendResetPasswordEmail = require('../mailers/resetpassword')
const bcrypt = require('bcryptjs');

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
  if(req.user.id == req.params.id){
 
  try{
 
      let user = await User.findByIdAndUpdate(req.params.id);
           User.uploadedAvatar(req,res,function(err){
             if(err){
              console.log('******multer error:',err)
             }
              user.name=req.body.name
              user.email=req.body.email

              if(req.file){
                //saving the path of uploaded file into the avatar field in th user
                user.avatar = User.avatarPath + '/'+ req.file.filename
              }
              user.save()
              req.flash('success', 'Updated!');
              return res.redirect('back')
           })
         
         
    
          }catch(err){
            console.log('Error',err);
            return;
           }
          
    }else{
               req.flash('error', 'Unauthorized!');
                return res.status(401).send('Unauthorized')
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


module.exports.forgot_password = function(req,res){
  return res.render("user_forgotpassword",
  { title:"forgot password"})
} 




 module.exports.sendforgotpasswordEmail = async function(req,res){
    
  try{
 
     //check if user with given email exists
     const user = await User.findOne({email:req.body.email});
    if(!user){
      req.flash('error','No account with that email addres exists');
      return res.redirect('/users/sign-up')

    }

    // Generete reset password token and save it to users document

    const token =crypto.randomBytes(20).toString('hex');
    user.resetpasswordToken=token;
    user.resetpasswordExpires=Date.now() + 3600000; // Token expires in 1 hour
    await user.save()
   
    //send email to user with reset password link
    const resetPasswordLink = `http://${req.headers.host}/users/reset-password/${token}`;
    await sendResetPasswordEmail.passwordLink(user.email,resetPasswordLink);
    req.flash('success', 'An email has been sent to ' + user.email + ' with further instructions.');
    res.redirect('back');

  } catch (err) {
    console.error(err);
    req.flash('error', 'Something went wrong. Please try again later.');
     return res.redirect('/forgot-password');
  }

 }

module.exports.renderResetPassword = function(req,res){
  User.findOne({resetpasswordToken: req.params.token ,resetpasswordExpires: {$gt: Date.now()}},function(err,user){
      if(!user){
        req.flash('error','password reset token is invalid or has expired.');
        return res.redirect('/forgot-password');
      }
      res.render('reset_password',{token:req.params.token,title:"forgot password"})
  })
}







 module.exports.resetPassword=async function(req,res){
  try{
     const user =await User.findOne({resetpasswordToken:req.params.token,resetpasswordExpires:{ $gt:Date.now() } })
        if(!user){
          req.flash('error','Password reset token is invalid or has expired.');
          return res.redirect('back');
        }

        if(req.body.password !== req.body.confirm){
          req.flash('error','password do not match.')
          return res.redirect('back')
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        user.password = hash;
        user.resetpasswordToken = undefined;
        user.resetpasswordExpires = undefined;
         await user.save()

        req.logIn(user,function(err){
          if(err) return next(err);
          req.flash('success','your password has been reset...')
          res.redirect('/')
        });
     } catch(err){
      console.log(err);
      req.flash('error', 'Something went wrong. Please try again later.');
      res.redirect('back');
     }
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
