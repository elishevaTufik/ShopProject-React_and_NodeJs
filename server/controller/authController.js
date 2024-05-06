const bcrypt= require("bcrypt") 
const Client = require("../models/Client")
const Worker = require("../models/Workers")

const jwt= require('jsonwebtoken')

const login = async (req,res)=>{

    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({message:'All fields are required'})
    }   

    const foundClient = await Client.findOne({username}).lean()
    const foundWorker = await Worker.findOne({username}).lean()

    if (!foundClient && !foundWorker) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    if(foundClient!=null){

        const match = await bcrypt.compare(password, foundClient.password)
    
        if(!match){
            return res.status(401).json({message:'Unauthorized' })
        }

        const ClientInfo= {
            _id:foundClient._id,
            username:foundClient.username,
            name:foundClient.name,
            email:foundClient.email,
            phone:foundClient.phone,
            points:foundClient.points,
            coupon:foundClient.coupon,
            permission:foundClient.permission
        } 
        const token = jwt.sign(ClientInfo, process.env.ACCESS_TOKEN_SECRET)
        
        res.json({token:token})
    }


    if(foundWorker){

        const match = await bcrypt.compare(password, foundWorker.password)
    
        if(!match){
            return res.status(401).json({message:'Unauthorized' })
        }

        const WorkerInfo= {
            _id:foundWorker._id,
            username:foundWorker.username,
            name:foundWorker.name,
            email:foundWorker.email,
            phone:foundWorker.phone,
            branchId:foundWorker.branchId,
            permission:foundWorker.permission,
        } 
        const token = jwt.sign(WorkerInfo, process.env.ACCESS_TOKEN_SECRET)
        
        res.json({token:token})
    }
 }

const registerClient = async (req,res)=>{
    
    const {username, password, name, email, phone, points, coupon, permission} = req.body

    if (!name || !username || !password || !email || !phone) {
        return res.status(400).json({message:'All fields are required'})
    }
    
    const duplicateClient = await Client.findOne({username:username}).lean()
    if(duplicateClient){
        return res.status(409).json({message:"This username is alredy exist .Try another one... "})
    }

    const duplicateWorker = await Worker.findOne({username:username}).lean()
    if(duplicateWorker){
        return res.status(409).json({message:"This username is alredy exist .Try another one... "})
    }

    const hashedPwd = await bcrypt.hash(password, 10)


    
    const client= await Client.create({username, password:hashedPwd, name, email, phone, points, coupon, permission})
    
    if(!client){
        return res.status(400).json({message:'error'})
    }
  
    res.json({message:` ${client.name}, you created successfully!!`})
}


const registerWorker = async (req,res)=>{
    
    // if(req.user.permission!='admin')
    // {
    //     return res.status(401).json({message:'Unauthorized' })
    // }

    const {username, password, name, email, phone, branchId, permission} = req.body

    if (!name || !username || !password ||!phone) {
        return res.status(400).json({message:'username, password, name and  email are required'})
    }
     ///////   
    const duplicateClient = await Client.findOne({username:username}).lean()
    if(duplicateClient){
        return res.status(409).json({message:"This username is alredy exist .Try another one... "})
    }
////////
    const duplicateWorker = await Worker.findOne({username:username}).lean()
    if(duplicateWorker){
        return res.status(409).json({message:"This username is alredy exist .Try another one... "})
    }
    const hashedPwd = await bcrypt.hash(password, 10)
    
    if(permission!='admin' && permission!='shift manager' && permission!='worker')
    {
        return res.status(400).json({message:'your premission needs to be admin, shift manager or worker'})
    }
 
    const worker= await Worker.create({username, password:hashedPwd, name, email, phone, branchId, permission})
    
    if(!worker){
        return res.status(400).json({message:'All fields are required'})
    }
  
    res.json({message:` ${worker.name}, you created successfully!!`})
}



module.exports = {login, registerClient, registerWorker}