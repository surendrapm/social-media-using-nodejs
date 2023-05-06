const Like = require('../models/likes')
const Comment = require('../models/comments')
const Post = require('../models/posts')

module.exports.togglelike = async function(req,res){
    try{
        // likes/toggle/?id=abcdef&type=Post

        let likeable;
        let deleted = false;


        if(req.query.type == 'Post'){
             likeable = await Post.findById(req.query.id).populate('likes')
        }else{
                    likeable = await Comment.findById(req.query.id).populate('likes')
        }


        //chek if already exits 
        let existingLike = await Like.findOne({
            likeable:req.query.id,
            onModel:req.query.type,
            user:req.user._id
        })


          // if a like already exists then delete it
          if(existingLike){
                 likeable.likes.pull(existingLike._id);
                 likeable.save()
                 

                 existingLike.remove();
                 deleted = true
          }else{
              //make a new like
              let newLike =  await Like.create({
                likeable:req.query.id,
                onModel:req.query.type,
                user:req.user._id
            })
            likeable.likes.push(newLike._id);
            likeable.save()
          }
          return res.json(200,{
            message:'request successfull',
            data:{
                deleted:deleted
            }
          })

    }catch(err){
        console.log(err)
        return res.json(500,{
            message:'interenal server error'
        })
    }
}