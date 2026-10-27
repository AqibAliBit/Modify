const jwt=require('jsonwebtoken')
const redis=require('../config/cache')
async function authCheck(req,res,next) {
    const token=req.cookies.token
    
    
    if(!token){
        return res.status(401).json({
            message:'Invalid Crendentials'
        })
    }
    const Blackcheck= await redis.get(token)
        if(Blackcheck){
           return res.status(401).json({
                message:'Invalid User'
            })
        }
    let decoded;
    
  try{
     decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
  }
  catch(err){
    console.log(err);
    
  }
  req.user=decoded
  
  
  next()
}
module.exports=authCheck