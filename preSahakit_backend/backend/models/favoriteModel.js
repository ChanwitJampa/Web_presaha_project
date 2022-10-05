const mongoose = require('mongoose')

const favoriteSchema = mongoose.Schema({
    userID: {
        type: mongoose.Types.ObjectId,
        required: [true, 'Please add a userID']
    },
    Items: [
        {
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

        },

    ]

},)

module.exports = mongoose.model('Favorite', favoriteSchema)