const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:[true,'Username Must Be Required'],
        unique:[true,'Username Must Be Unique']
    },
    email:{
        type:String,
        required:[true,'Email Must Be Required'],
        unique:[true,'Email Must Be Required']
    },
    password:{
        type:String,
        required:[true,'Password Must Be Required'],
        unique:[true,'Password Must Be Required']
    }
})
const userModel=mongoose.model('users',userSchema)
// userSchema.pre('save',function(next){})
// userSchema.post('save',function(next){})
module.exports=userModel