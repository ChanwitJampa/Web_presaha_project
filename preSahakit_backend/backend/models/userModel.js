const mongoose = require('mongoose')

const hospitalSchema = mongoose.Schema({
    userName:{
        type: String,
        required:[true,'Please add a userName']
    },
    password:{
        type: String,
        select: false,
        required:[true,'Please add a assword']
    },
    phoneNumber:{
        type: String,
        required: [true, 'Please add a phoneNumber']
    },
    firstName: {
        type: String,
        required: [true, 'Please add a firstName']
    },
    lastName:{
        type: String,
        required:[true,'Please add a  lastName']
    },
    address:{
        type: String,
        required:[true,'Please add a  address']
    },
    role:{
        type: String,
        select: false,
        default:"user"
    },
    token:{
        type:String
    }
},
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', hospitalSchema)