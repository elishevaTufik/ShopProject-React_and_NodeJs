const mongoose = require('mongoose')

const WorkersSchema = new mongoose.Schema(
{  
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type:String,
        lowercase: true,
    },
    phone: {
        type: String,
        required: true
    },
    branchId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Branches"
    },
    permission:{   
        type:String,
        enum:["admin", "shift manager", "worker"],
        default:"worker",
    }
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Workers', WorkersSchema)