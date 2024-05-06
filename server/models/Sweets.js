const mongoose = require('mongoose')

const sweetsSchema = new mongoose.Schema(
{
 
    price:{
        type:Number,
        min:0,
        required: true,
    }, 
    name:{
        type: String,
        required: true,
        unique: true,
    }, 
    description:{
        type: String,
        required: true,
    },
    extras:{
        type:[String]
    },
    image:{
        type: String,
    },
    inInventory: {
        type: Boolean,
        default: false,
        required: true,
    },
 
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Sweets', sweetsSchema)