const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    itemID:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'Please add a itemID']
    },
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'Please add a userID']
    },
    amount:{
        type: Number,
        required:[true,'Please add a amount']
    },
},)

module.exports = mongoose.model('Order', orderSchema)