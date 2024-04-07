const mongoose = require('mongoose')

const branchSchema = new mongoose.Schema({
    city: {
        type: String,
        required: true,
    },
    location: {
        street: String,
        building: Number
    },
    openHours: {
        open:{
            type: Number,
            required:true
        },
        close:{
            type: Number,
            required:true
        },
    },
    image:{
        type:String,
    }
    },
{
    timestamps: true
}
)
module.exports = mongoose.model("Branches", branchSchema)
