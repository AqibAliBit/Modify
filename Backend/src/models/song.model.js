const mongoose=require('mongoose')

const songSchema=mongoose.Schema({
    Url:{
        type:String,
        required:[true,'Song Url Is Required']
    },
    posterUrl:{
      type:String,
      required:[true,'Poster Url Is Required']
    },
    title:{
       type:String,
       required:[true,'Title Is Required']
    },
    mood:{
        type:String,
        enum:['happy','sad','surprised'],
        message:'Enum Is'
    }
})

const songModel=mongoose.model('Songs',songSchema)

module.exports=songModel