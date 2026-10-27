const app=require('./src/app')
const connectDB=require('./src/config/database')

app.listen(3000,()=>{
    console.log('Server Is Running On Port 3000');
    
})
connectDB()
