const User = require('../../../models/user')




module.exports.createSession = async function(req,res){
    try{
        let user = await User.findOne({email:req.body.email})
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"Invalid username or password"
            });
        }

        return res.status(200).json({
            message:"successfuly signed-in here is your token plz keet it safe",
            data:{
                token: jwt.sign(user.toJSON() , 'codeial' , {expiresIn:'100000'})
            }
        })
    }catch(err){
        console.log('********', err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}








module.exports.sendforgotpasswordEmail = async function(req,res){
    
    try{
      const {email} = req.body;
      
      //check if user with given email exists
      const user = await User.findOne({email});
      if(!user){
        req.flash('error','No account with that email addres exists');
        return res.status(404).json({error:'No account with that email address exists. '})

      }
  
      // Generete reset password token and save it to users document
  
      const token = generateResetPasswordToken();
      user.resetpasswordToken=token;
      user.resetpasswordExpires=Date.now() + 3600000; // Token expires in 1 hour
      await user.save()
     
      //send email to user with reset password link
    //   const resetPasswordLink = `http://${req.headers.host}/users/reset-password/${token}`;
      await sendResetPasswordEmail(user.email);

      res.json({message:'An email has sent to your email address with instructions to reset your password'})
    }catch(err){
        console.log(err);
        res.status(500).json({error:'Something went wrong . please try again later.'})
    }
    }





// module.exports.resetPassword = async function(req,res){
//     try{
//         // Find user with given token and check if token has not expired
//     const user = await User.findOne({
//         resetPasswordToken: req.params.token,
//         resetPasswordExpires: { $gt: Date.now() },
//       });


//        //if user not found or token has expired, redirect to forgot password  page
//         if(!user){
//             req.flash('error','password reset token is invalid or has expired');
//             return
//         }
//     }
// } 







  
  // Helper function to generate a random reset password token
function generateResetPasswordToken() {
    const token = crypto.randomBytes(20).toString('hex');
    return token;
  }
  

//   module.exports.resetPassword = async function(req,res){
//     try{
//         const {token,password} = req.body;

//     }
//   }