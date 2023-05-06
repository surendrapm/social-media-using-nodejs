const nodeMailer = require('../config/nodemailer')

exports.passwordLink=(email,token)=>{
    console.log('inside forgotpasswordlink mailer',email,token)
    nodeMailer.transporter.sendMail({
        from:'suredon456@gmail.com',
        to:email,
        subject:'Reset your password for Codeial',
        html: 
        `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
      
    },(err,info)=>{
        if(err){console.log("error in sending mail",err);
        req.flash('error', 'Something went wrong. Please try again later.');
        res.redirect('/forgot-password');
        }
        console.log('message sent', info);
        return
    })
}