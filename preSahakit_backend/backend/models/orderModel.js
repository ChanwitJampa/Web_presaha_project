const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    itemID:{
        type: String,
        required:[true,'Please add a userName']
    },
    count:{
        type: Number,
        select: false,
        required:[true,'Please add a assword']
    },
},)

module.exports = mongoose.model('Order', orderSchema)