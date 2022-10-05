const mongoose = require("mongoose");

var subSchema = mongoose.Schema({

    itemID: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please add a itemID']
    },
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    imagePath: {
        type: String,
        required: [true, 'Please add a image']
    },
    amount:{
        type:Number,
        default:1
    }


}, { _id: false });

const CartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add a name']
        },
        Items: {
            type: [subSchema],
            default: [],
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('Cart', CartSchema)