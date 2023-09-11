const dotenv=require('dotenv')
const mongoose=require('mongoose')

const { log } = require('console')

const mydbmodel=require('./Model/model')


//connecting to db

dotenv.config({path:'./config.env'})
console.log(process.env.connect_mongodb)
mongoose.connect(process.env.connect_mongodb,{
    useNewUrlParser:true

}).then((conn)=>{
    console.log(conn)
    log('DB Connect Successfully!!!')
}).catch((error)=>{
    console.log('error',error.message)
})

//server intialization
const express=require('express')

let expressapi=express()

//handling get request
expressapi.get('/api/data',async(req,res)=>{
    try {
        const modelschemadata=await mydbmodel.find();
        res.header('Access-Control-Allow-Origin','*')
        res.header('Access-Control-Allow-Methods','GET')
        
        res.status(200).json({
            
          modelschemadata
            
        })
    } catch (error) {
        console.log(error,'zala')
    }
})
const cors = require('cors');

expressapi.use(cors())
expressapi.listen(8000,()=>{
    console.log("Server started on port :- "+"http://localhost:8000/")
})
