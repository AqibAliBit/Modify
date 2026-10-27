const mongoose=require('mongoose')

const BlackListSchema=mongoose.Schema({
    token:{
        type:String,
        required:[true,'User Id Is Required']
    }
},{
   timestamps:true
})

const BlackModel=mongoose.model('BlackLists',BlackListSchema)

module.exports=BlackModel