const mongoose = require('mongoose')

const discountSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please add a userName']
    },
    discountType:{
        type: String,
        enum:['percent','realDiscount'],
        select: false,
        required:[true,'Please add a discountType']
    },
    discount:{
        type: Number,
        select: false,
        required:[true,'Please add a discount Value']
    },
    condition:{
        type: Number,
        select: false,
        required:[true,'Please add a condition']
    },
    
},)

module.exports = mongoose.model('Discount', discountSchema)