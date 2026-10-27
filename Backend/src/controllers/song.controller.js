const id3=require('node-id3')
const Storage=require('../services/storage.services')
const songModel = require('../models/song.model')
async function uploadFile(req,res) {
  const {mood}=req.body
  const songBuffer=req.file.buffer
   const tags=id3.read(songBuffer) 
   console.log(tags);
const [songFile, posterFile] = await Promise.all([
    Storage.uploadFile({
        buffer: songBuffer,
        filename: tags.title + '.mp3',
        folder: 'cohort-2/modify/songs'
    }),

    Storage.uploadFile({
        buffer: tags.image.imageBuffer,
        filename: tags.title + '.jpeg',
        folder: 'cohort-2/modify/posters'
    })
])
const song=await songModel.create({
  title:tags.title,
  Url:songFile.url,
  posterUrl:posterFile.url,
  mood:mood
})

res.status(201).json({
  message:'Song Created Successfully',
  song
})
}

async function getSong(req,res) {
  const {mood}=req.query

  const song=await songModel.findOne({
      mood
  })
  res.status(201).json({
    message:'Song Fetched Successfully',
    song
  })
}

module.exports={
    uploadFile,
    getSong
}