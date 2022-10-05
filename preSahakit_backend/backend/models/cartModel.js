const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            required: [true, 'Please add a name']
        },
        items: [
            {
                itemID: {
                    type: mongoose.Schema.Types.ObjectId
                },
                amount: {
                    type: Number,
                    default: 1,
                }
            }
        ]
    },
    {timestamps:true}
);
module.exports = mongoose.model('Cart', CartSchema)