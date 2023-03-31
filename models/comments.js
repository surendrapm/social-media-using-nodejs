const mongoose =  require('mongoose')

const commentShecma = new mongoose.Schema({
       content:{
        type:String,
        required:true
       },

       //comment belongs to user 
       user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
       },
       post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
       }

},{
    timestamps:true
});


const Comments = mongoose.model('Comments',commentShecma)

module.exports=Comments