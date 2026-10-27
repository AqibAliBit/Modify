const express=require('express')
const upload = require('../middleware/upload.middleware')
const songController=require('../controllers/song.controller')
const songRoutes=express.Router()

songRoutes.post('/',upload.single('song'),songController.uploadFile)
songRoutes.get('/',songController.getSong)


module.exports=songRoutes