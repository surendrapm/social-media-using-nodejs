const Comments = require('../models/comments');
const Post  = require('../models/posts')

module.exports.create =async function(req,res){
  try{
    await Post.create({
      content:req.body.content,
      user:req.user._id
    })
    req.flash('success','post created')
    return res.redirect('/')
  }catch(err){
    req.flash('error','error ocured')
    console.log('error',err)
    return;
  }
  
}

//delete the posts

module.exports.destroy = async function(req,res){
 
 try{
  let post = await Post.findById(req.params.id)
  // .id means converting the objects id into string
if(post.user ==  req.user.id){
  post.remove()
     await Comments.deleteMany({post:req.params.id});

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
  



















