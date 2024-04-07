const Messages = require("../models/Messages");

const getAllMessages = async (req, res) => {

    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const messages = await Messages.find().lean()
    if (!messages?.length) {
        return res.status(400).json({ message: 'No Messages' })
    }
    res.json(messages)
}

const getMessagesNotChecked = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const messages = await Messages.find({checked:false}).lean()
    if (!messages?.length) {
        return res.status(400).json({ message: 'No Messages' })
    }
    res.json(messages)
}

const writeMessage = async (req, res) => {

    if(req.user.permission!='client')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const {clientId, title, text, date} = req.body
    if (!clientId || !title || !text) 
    {
        return res.status(400).json({ message: 'clientId, title, text are required' })
    }

    const messages = await Messages.create({clientId, title, text, date})
    if(messages){
        return res.json(messages)
    }
    else{
        return res.status(400).json({ message: 'Invalid messages ' })
    }
}

const updateChecked = async (req, res) => {
    if(req.user.permission!='admin')
    {
        return res.status(401).json({message:'Unauthorized' })
    }
    const { id } = req.params
    const message = await Messages.findById(id)
    if (!message)
    {
        return res.status(400).json({ message: 'message not found' })
    }
    message.checked = !message.checked
    const updatedChecked = await message.save()
    res.json(`'${updatedChecked.title}' updated`)
    }

module.exports = {
    getAllMessages,
    getMessagesNotChecked,
    writeMessage,
    updateChecked,
}