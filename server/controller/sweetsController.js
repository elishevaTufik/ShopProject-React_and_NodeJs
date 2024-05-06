const Sweets = require("../models/Sweets");

const getAllSweets = async (req, res) => {
    const sweets = await Sweets.find().lean()
    if (!sweets?.length) {
        return res.status(400).json({ message: 'erorr' })
    }
    res.json(sweets)
} 

const createNewSweet = async (req, res) => {

    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const {price, name, description, extras, image, inInventory} = req.body
    if (!name || !price || !description ) 
    {
        return res.status(400).json({ message: 'all details are required' })
    }

    if(await Sweets.findOne({name:name})){
        return res.status(400).json({ message: 'This name is already exist' })
    }

    const sweet = await Sweets.create({price, name, description, extras, image, inInventory})
    if(sweet){
        return res.json(sweet)
    }
    else{
        return res.status(400).json({ message: 'Invalid Sweet ' })
    }
}


const deleteSweet = async (req, res) => {

    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }

    const { id } = req.params
    const sweet = await Sweets.findById(id)
    if (!sweet) 
    {
        return res.status(400).json({ message: 'sweet not found' })
    }
    const result = await sweet.deleteOne()
    const reply=`sweet '${result.name}' ID ${result._id} deleted`
    res.json(reply)
    }


const updateSweet = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const {id, price, name, description, extras, inInventory}= req.body

    console.log("id"+id);
    console.log(price);
    console.log(name);

    if (!name || !price || !description || !id) {
        return res.status(400).json({ message: "fields are required" })
    }

    const sweet = await Sweets.findById(id)
    if(!sweet){
        return res.status(400).json({ message: 'sweet not found' })
    }

    sweet.price = price
    sweet.name = name
    sweet.description = description
    sweet.extras = extras
    sweet.inInventory = inInventory

    const updatedsweet = await sweet.save()
    res.json(`${updatedsweet.name} updated`)
}

const updateInInventory = async (req, res) => {

    if(req.user.permission!='admin' && req.user.permission!='shift manager' && req.user.permission!='worker')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    
    const { id } = req.params
    const sweet = await Sweets.findById(id)
    if (!sweet)
    {
        return res.status(400).json({ message: 'sweet not found' })
    }
    sweet.inInventory = !sweet.inInventory
    const updatedsweet = await sweet.save()
    res.json(`'${updatedsweet.name}' updated`)
    }


module.exports = {
    getAllSweets,
    createNewSweet,
    deleteSweet,
    updateSweet,
    updateInInventory
}