const mongoose = require('mongoose')

const messagesSchema = new mongoose.Schema(
{
    clientId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Client'
    },
    title:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
    },
    date:{
        type:mongoose.Schema.Types.Date,
        default :()=>new Date() + 7*24*60*60*1000
    },
    checked:{
    type:Boolean,
    default:false
    },
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Messages', messagesSchema)