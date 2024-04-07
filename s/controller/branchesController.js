const Branches = require("../models/Branches")

const getAllBranches = async (req, res) => {
    const branches = await Branches.find({}).lean()
    if (!branches?.length) {
        return res.status(400).json({ message: "no branches find!!" })
    }
    res.json(branches)
}

const createBranch = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const { city, location, openHours } = req.body
    if (!city || !location || !openHours) {
        return res.status(400).json({ message: 'fields are required' })
    }
    const branch = await Branches.create({ city, location, openHours })
    if (branch) {
        return res.status(201).json({ message: 'New branch created' })
    }
    else {
        return res.status(400).json({ message: 'Invalid branch ' })
    }
}

const updateBranch = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const { id } = req.params
    const {city, location, openHours } = req.body
    if (!city || !location || !openHours) {
        return res.status(400).json({ message: "fields are required" })
    }
    const branch = await Branches.findById(id)
    if (!branch) {
        return res.status(400).json({ message: "Branch not found" })
    }

    branch.city = city
    branch.openHours = openHours
    branch.location = location
    const updateBranch = await branch.save()
    res.json(`"${updateBranch.city}" updated`)

}

const deleteBranch = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const { id } = req.params
    const branch = await Branches.findById(id)
    if (!branch) {
        return res.status(400).json({ message: "Branch not found" })
    }
    const result = await branch.deleteOne()
    const reply = `Branch '${result.city}' ID ${result._id} deleted`
    res.json(reply)
}

module.exports = { 
    getAllBranches, 
    createBranch, 
    updateBranch, 
    deleteBranch 
}
