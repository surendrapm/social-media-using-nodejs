const Comments = require('../models/comments');
const Like = require('../models/likes');
const Post  = require('../models/posts')

module.exports.create =async function(req,res){
  try{
    let post = await Post.create({
      content:req.body.content,
      user:req.user._id
    })
   
    if(req.xhr){
      // if we want to populate just the name of the user (we'll not want to send the password in the API), this is how we do it!
      // post = await post.populate('user', 'name').exec();
      post = await Post.findById(post._id).populate('user','name').exec();
     
      return res.status(200).json({
        data:{
          post:post
        },
        message:"post created",
       
      })
    }

    
    req.flash('success', 'Post published!');
    return res.redirect('/')
  }catch(err){
    req.flash('error',err.message)
    console.log(err)
    return res.redirect('back')
  
  }
  
}

//delete the posts

module.exports.destroy = async function(req,res){
 
 try{
  let post = await Post.findById(req.params.id)
  // .id means converting the objects id into string
if(post.user ==  req.user.id){
   
    await Like.deleteMany({likeable:post,onModel:'Post'});
    await Like.deleteMany({_id: {likeable:post.comments}});
  post.remove()
    
     await Comments.deleteMany({post:req.params.id});
    
     if(req.xhr){
      return res.status(200).json({
        data:{
          post_id:req.params.id
        },
        message:'post deleted '
      })
    }
      req.flash('success','Post and associated comments deleted successfully')
      return res.redirect('back')
}else{
      req.flash('error','you cannot delete this post')
     return res.redirect('/')
  
}
 }catch(err){
  req.flash('error','error ocured')
  return;
 }
}
  



















