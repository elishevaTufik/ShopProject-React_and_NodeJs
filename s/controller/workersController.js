const Workers = require("../models/Workers");

const getAllWorkers = async (req, res) => {

    if(req.user.permission!='admin' && req.user.permission!='shift manager' )
    {
        return res.status(401).json({message:'Unauthorized' })
    }

    const worker = await Workers.find({permission:"worker"}).lean()
    if (!worker?.length) {
        return res.status(400).json({ message: 'Not such Worker' })
    }
    res.json(worker)
}

const getAllShiftManagers = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const ShiftManagers = await Workers.find({permission:"shift manager"}).lean()
    if (!ShiftManagers?.length) {
        return res.status(400).json({ message: 'Not such Worker' })
    }
    res.json(ShiftManagers)
}

// const createWorker = async (req, res) => {
//     const {name, password, username, email, phone, branchId, permission } = req.body
//     if(!username || !password || !name || !phone)
//     {
//         return res.status(400).json({ message: 'username, password, name and phone are required' })
//     }

//     if(await Workers.findOne({username:username})){
//         return res.status(400).json({ message: 'This username is already exist' })
//     }

//     if(permission != undefined && permission != 'admin' && permission != 'shift manager'&& permission != 'worker'){
//         return res.status(400).json({ message: 'The roles must be admin, shift manager or worker'})
//     }

//     const worker = await Workers.create({name, password, username, email, phone, branchId, permission })
//     if (worker) 
//     {
//         return res.status(201).json({ message: 'New worker created' })
//     }
//     else 
//     {
//         return res.status(400).json({ message: 'Invalid worker ' })
//     }
// }


const deleteWorker = async (req, res) => {

    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }

    const { id } = req.params
    const worker = await Workers.findById(id).exec()
    if (!worker) 
    {
        return res.status(400).json({ message: 'worker not found' })
    }
    const result = await worker.deleteOne()
    const reply=`worker '${result.name}' ID ${result._id} deleted`
    res.json(reply)
    }

const updateWorkerDetails = async (req,res)=>{
    
    if(req.user.permission!='admin' && req.user.permission!='shift manager' && req.user.permission!='worker')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const { id } = req.params
    const {name, password, email, phone, branchId, permission}= req.body
    if(!id  || !password || !name || !phone){
        return res.status(400).json({ message: 'id, password, name and phone are required' })
    }

    if(permission != undefined && permission != 'admin' && permission != 'shift manager'&& permission != 'worker'){
        return res.status(400).json({ message: 'The roles must be admin, shift manager or worker'})
    }

    const worker = await Workers.findById(id).exec()
    if(!worker){
        return res.status(400).json({ message: 'Worker not found' })
    }

    worker.password = password
    worker.name = name
    worker.email = email
    worker.phone = phone
    worker.branchId = branchId
    worker.permission = permission

    const updateworker = await worker.save()
    res.json(`${updateworker.name} updated`)
}

module.exports = {
    getAllWorkers,
    getAllShiftManagers,
    // createWorker,
    deleteWorker,
    updateWorkerDetails
}