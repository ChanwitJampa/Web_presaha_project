const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
    name:{
        type: String,
        required:[true,'Please add a userName']
    },
    price:{
        type: Number,
        required:[true,'Please add a price']
    },
    description:{
        type: String,
        required:[true,'Please add a description']
    },
    imagePath:{
        type: String,
        required:[true,'Please add a image']
    },
    
},)

module.exports = mongoose.model('Item', hospitalSchema)