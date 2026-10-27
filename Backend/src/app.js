require('dotenv').config()
const express=require('express')
const userRoutes=require('./routes/user.routes')
const cookie=require('cookie-parser')
const cors=require('cors')
const songRoutes = require('./routes/song.route')

const app=express()
app.use(express.json())
app.use(cookie())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use('/api/auth',userRoutes)
app.use('/api/songs',songRoutes)
module.exports=app
