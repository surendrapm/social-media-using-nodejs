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
       },
       likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Like'
        }
    ]

},{
    timestamps:true
});


const Comments = mongoose.model('Comments',commentShecma)

module.exports=Comments