
const asyncHandler = require('express-async-handler')
const Item = require('../models/itemModel')
const { hidden } = require('colors');

//@desc Get items
//@route GET /api/items
//@access Private
const getItems = asyncHandler(async (req, res) => {
    const items = await Item.find()
    res.status(200).json(items)
})



//@desc Set item
//@route POST /api/items
//@access Private
const setItem = asyncHandler(async (req, res) => {

    const { name, price } = req.body
    var oldItem
    if (name) {
        oldItem = await Item.findOne({ name: name })

        if (oldItem) {
            res.status(400)
            throw new Error('ItemName user is aleady use')
        }
    }
    else {
        res.status(400)
        throw new Error(' please add name of Item')
    }

    const item = await Item.create({
        name: req.body.name,
        price: req.body.price,
    })
    if (oldItem)
        res.status(200).json(oldItem)
    else
        res.status(200).json(item)
})




//@desc Update Item
//@route PUT /api/Items/:id
//@access Private
const putItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(400)
        throw new Error('item not found')
    }

    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json(updatedItem)
})


//@desc Delete item
//@route DELETE /api/items/:id
//@access Private
const deleteItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(400)
        throw new Error('item id not found')
    }
    const deleteuser = await Item.findByIdAndDelete(req.params.id)
    res.status(200).json({ id: req.params.id })
})



//@desc Get item
//@route GET /api/items/:id
//@access Private
const getItem = asyncHandler(async (req, res) => {
    const item = await Item.findById(req.params.id)
    if (!item) {
        res.status(400)
        throw new Error('item not found')
    }
    res.status(200).json(item)
})




module.exports = {
    getItems,
    setItem,
    putItem,
    deleteItem,
    getItem
}