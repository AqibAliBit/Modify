const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const userModel=require('../models/user.model')
const BlackModel = require('../models/blacklist')
const redis = require('../config/cache')
async function RegisterController(req,res) {
    const {username,email,password}=req.body
    const finduser=await userModel.findOne({
        $or:[
            {
                username:username
            },
            {
                email:email
            }
        ]
    })
    if(finduser){
        return res.status(401).json({
            message:'User Already Exists'
        })
    }
    const hash=await bcrypt.hash(password,10)
  const user=await userModel.create({
        username:username,
        email:email,
        password:hash
    })
    const token=jwt.sign(
        {
            user:user._id
        },
        process.env.JWT_SECRET_KEY
    )
    res.cookie('token',token)
  res.status(201).json({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    message:'User Created Successfully',
    user:{
        username:username,
        email:email
    },
    token

  })
    
}



async function LoginController(req,res) {
    const {username,password}=req.body
    const finduser=await userModel.findOne({
        $and:[
            {
                username:username
            },
        
        ]
    })
    if(!finduser){
        return res.status(401).json({
            message:'Invalid Crendentials'
        })
    }
   const checkPassword=await bcrypt.compare(password,finduser.password)
   if(!checkPassword){
      return res.status(400).json({
        message:'Invalid Password'
      })
   }

    const token=jwt.sign(
        {
            user:finduser._id
        },
        process.env.JWT_SECRET_KEY
    )
    res.cookie('token',token)
  res.status(201).json({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
    message:'User Login Successfully',
    finduser:{
        username:username,
        
    },
    token

  })
    
}

async function getMe(req,res) {
    const userId=req.user.user

    if(!userId){
        return res.status(401).json({
            message:'User Not Found'
        })
    }
    const user=await userModel.findById(userId)
    res.status(201).json({
        message:'User Fetched Successfully',
        user
    })
}

async function Logout(req,res) {
    const token=req.cookies.token
    res.clearCookie('token')
  await redis.set(token,Date.now().toString())
    res.status(201).json({
        message:'Logout Successfully'
    })
}
module.exports={
    RegisterController,
    LoginController,
    getMe,
    Logout
}