const mongoose = require('mongoose')

const ordersSchema = new mongoose.Schema(
    {
        clientId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Client"
        },

        branchId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Branches"
        },

        sweets: {
            type: [mongoose.Schema.Types.ObjectId],
            ref:"Sweets",
            required: true
        },

        address: {
            type:String,
        },

        status: {
            type:String,
            enum: ["accepted", "done", "closed","canceled"],
            default: "accepted"
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Orders', ordersSchema)