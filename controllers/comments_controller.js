const Comment = require('../models/comments')
const Post = require('../models/posts')
const commentsMailer = require('../mailers/comments_mailer')
const commentEmailWorker = require('../workers/comment_email_workers')
const queue = require('../config/kue')
module.exports.create =async function(req,res){
     try{
     let post = await Post.findById(req.body.post);

     if(post){
          let comment = await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
           })
                
               post.comments.push(comment);
               post.save();
                 
              
               comment = await Comment.findById(comment._id).populate('user','name email').exec();
               // commentsMailer.newComment(comment)
               let job = queue.create('emails',comment).save(function(err){
                    if(err){
                         console.log('error in creating a queue');
                    }
                    console.log("job is enqueueed",job.id)
               })
                
               if(req.xhr){
                    //similar for commnets to fetch the users id
                                    
                    return res.status(200).json({
                         data:{
                           comment:comment
                         },
                         message:"post created"
                        
                    })
               }
               req.flash('success', 'Comment published!');

               return res.redirect('/');
           
      }

    }catch(err){
     req.flash('error',err)
          console.log('error',err);
          return
    }     
    
 
}

module.exports.destroy =async function(req,res){
         let comment = await Comment.findById(req.params.id)
         try{
          if(comment.user == req.user.id){
               let postId = comment.post;
               
               comment.remove();
  
               let post = Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})

               //send the comment id which was delted back to the views

               if(req.xhr){
                    return res.status(200).json({
                         data:{
                              comment_id:req.params.id
                         },
                         message:"post deleted"
                    });
               }
               req.flash('success', 'Comment deleted!');
               return res.redirect('back');
            }else{
               req.flash('error', 'Unauthorized');
                 return res.redirect('back')
            }
        

            
            
         }catch(err){
          req.flash('error', err);  
          return;
         }
         
}