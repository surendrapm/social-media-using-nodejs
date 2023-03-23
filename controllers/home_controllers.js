const Post = require('../models/posts')

module.exports.home = function(req,res){
   Post.find({}).populate('user').exec(function(err,post){
    return res.render('home',{
      title:"Dev-surii | Home",
      posts:post
   })
   });
   
}

// module.exports.name = function(req,res){
//     return res.end('<h1>DEVSURII...:)</h1>')
// }

