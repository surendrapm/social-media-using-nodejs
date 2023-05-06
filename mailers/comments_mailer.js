const nodeMailer = require('../config/nodemailer')

// this is another may of exporting a method
exports.newComment=(comment)=>{
    console.log('inside newcomment mailer',comment)
    let htmlString  = nodeMailer.renderTemplate({comment:comment},'./comments/new_comment.ejs')

nodeMailer.transporter.sendMail({
    from:'suredon456@gmail.com',
    to:comment.user.email,
    subject:'new comment published',
    html:htmlString
},(err,info)=>{
    if(err){console.log("error in sending mail",err);
     return
    }
    console.log('message sent', info);
    return
})
}