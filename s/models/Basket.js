const mongoose = require("mongoose")

const basketSchema = new mongoose.Schema({

    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Client"
    },
    sweetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"Sweets"
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },    
}, {
    timestamps: true
})

module.exports = mongoose.model("Basket", basketSchema) 