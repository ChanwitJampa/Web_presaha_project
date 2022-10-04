const mongoose = require('mongoose')

const discountSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please add a userName']
    },
    discountType:{
        type: String,
        enum:['percent','realDiscount'],
       
        required:[true,'Please add a discountType']
    },
    discount:{
        type: Number,
        
        required:[true,'Please add a discount Value']
    },
    condition:{
        type: Number,
    
        required:[true,'Please add a condition']
    },
    listUserUsed:[{
        type: mongoose.Schema.Types.ObjectId,
        default:[]
    }],
    
},)

module.exports = mongoose.model('Discount', discountSchema)