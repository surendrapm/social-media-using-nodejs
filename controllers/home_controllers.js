const Post = require('../models/posts')
const User = require('../models/user')
module.exports.home = async function(req,res){

try{
   let posts = await Post.find({})
  .populate('user') 
  .populate({
      path:'comments',
      populate:{
         path:'user'
      }
   })
   
   let users= await User.find({});
   
      return res.render('home',{
         title:"Dev-surii | Home",
         posts:posts,
         all_users:users
      })
   

    
}catch(err){
   console.log('Error',err);
   return;
}

}
  

// module.exports.name = function(req,res){
//     return res.end('<h1>DEVSURII...:)</h1>')
// }

