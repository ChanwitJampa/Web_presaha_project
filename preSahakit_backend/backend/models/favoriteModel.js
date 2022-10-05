const mongoose = require('mongoose')

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


}, { _id: false });

const favoriteSchema = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please add a userID']
    },
    Items: [subSchema]

},)

module.exports = mongoose.model('Favorite', favoriteSchema)