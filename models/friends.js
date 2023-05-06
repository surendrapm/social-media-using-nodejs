const mongoose = require('mongoose')


const friendshipSchema =  new mongoose.Schema({
    //the user who sent this request

    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },


    //the user who accepted this request , the is just understand ,otherwise, the users won't see a diffrence
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

},{
    timestamps:true
}
)

const Friends = mongoose.model('Friends',friendshipSchema)
module.exports = Friends;