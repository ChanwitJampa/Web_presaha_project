const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please add a userName']
    },
    price:{
        type: Number,
        select: false,
        required:[true,'Please add a assword']
    },
    
},)

module.exports = mongoose.model('Item', hospitalSchema)