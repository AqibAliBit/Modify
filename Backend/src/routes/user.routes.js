const express=require('express')
const userController=require('../controllers/user.controller')
const authCheck = require('../middleware/auth.middleware')
const userRoutes=express.Router()

userRoutes.post('/register',userController.RegisterController)
userRoutes.post('/login',userController.LoginController)
userRoutes.get('/get-me',authCheck,userController.getMe)
userRoutes.post('/logout',authCheck,userController.Logout)


module.exports=userRoutes