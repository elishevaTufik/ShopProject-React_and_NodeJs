const mongoose = require('mongoose')

const ClientSchema = new mongoose.Schema(
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
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default:0
    },
    permission:{   
        type:String,
        default:"client",
    },
    coupon:
    {
        type:String,
        enum: [20,30,50],
    }
},
    {
        timestamps: true
    }
)
    
module.exports = mongoose.model('Client', ClientSchema)