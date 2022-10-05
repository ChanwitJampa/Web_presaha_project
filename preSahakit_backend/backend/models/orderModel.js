const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
   
    userID:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'Please add a userID']
    },
   Items:[{
        itemID:{
            type: mongoose.Schema.Types.ObjectId
        },
        amount:{
            type: Number,
            default: 1,
        }
   }],
   total:{type:Number,required: [true,'Please add a total']},
   address:{type: Object,required: [true,'Please add a address']},
   status:{type:String, defualt:"pending"}
},)

module.exports = mongoose.model('Order', orderSchema)