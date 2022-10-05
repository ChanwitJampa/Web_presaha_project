
const asyncHandler = require('express-async-handler')
const Discount = require('../models/discountModel')

const mongoose = require("mongoose");

const User = require('../models/userModel')
const Item = require('../models/itemModel');
const Favorite = require('../models/favoriteModel');

const ObjectId = require('mongoose').Types.ObjectId;

const getAllFavorite = asyncHandler(async (req, res) => {
    const favorite = await Favorite.find()
    res.status(200).json(favorite)
})



const getFavoriteByUserName = asyncHandler(async (req, res) => {

    const user = await User.findOne({ userName: req.params.id })

    if (!user) {
        res.status(400)
        throw new Error(`${req.params.id} userID is not found`)
    }
    const userID = user._id

    const listFavorite = await Favorite.findOne({ userID: userID })

    if (!listFavorite) {
        res.status(200).json({userID:userID,Item:[]})
    }
    else
        res.status(200).json(listFavorite)
})


const getFavorite2 = asyncHandler(async (req, res) => {

    let listFavoriteID = []
    const user = await User.findOne({ userName: req.params.id })
    

    if (!user) {
        res.status(400)
        throw new Error(`${req.params.id} userID is not found`)
    }
    const userID = user._id

    const listFavorite = await Favorite.findOne({ userID: userID })

    if (!listFavorite) {
        res.status(200).json({userID:userID,Item:[]})
    }
    else{
        for(let i=0;i<listFavorite.Items.length;i++){
            listFavoriteID.push(listFavorite.Items[i].itemID)
        }
        res.status(200).json(listFavoriteID)
    }
        
})

const updateFavorite = asyncHandler(async (req, res) => {

    const user = await User.findOne({userName:req.body.userName})
    if (!user) {
        res.status(400)
        throw new Error(`${req.body.userName} userName is not found`)
    }

    const userID = user._id
    const favorite = await Favorite.findOne({ userID: userID })


    if (!favorite) {
        const createFavorite = await Favorite.create({
            userID: userID,
            Items: req.body.Items,
        })
        res.status(200).json(createFavorite)
    }
    else {
        try {
            const updateFavorite = await Favorite.findByIdAndUpdate(favorite._id, { userID: userID, Items: req.body.Items }, { new: true })
            res.status(200).json(updateFavorite)
        } catch (err) {
            res.status(400)
            throw new Error(`${err}`)
        }

    }
})

const removeFavorite = asyncHandler(async (req, res) => {

    const user = await User.findOne({userName:req.params.id})

    if(!user){
        res.status(400)
            throw new Error(`${req.params.id} userName is not found`)
    }

    const item = await Item.findById(req.body.itemID)

    if(!item){
        res.status(400)
            throw new Error(`${req.body.itemID} itemID is not found`)
    }

    const userID=user._id
    const userFavorite = await Favorite.findOne({userID:userID})
    const listFavorite = userFavorite.Items
    let count =0;
    for(let i=0; i<listFavorite.length; i++){
       
        if(listFavorite[i].itemID.equals(req.body.itemID)){
            listFavorite.splice(i,1)
            i--
            count++
        }
    }
    if(count>0){
        try {
            const updateFavorite = await Favorite.findByIdAndUpdate(userFavorite._id, {Items: listFavorite }, { new: true })
            res.status(200).json({message:`${req.body.itemID} remove from favorite userName : ${req.params.id} success`,response:updateFavorite})
        } catch (err) {
            res.status(400)
            throw new Error(`${err}`)
        }
    }
    else
    {
        res.status(400)
        throw new Error(`${req.body.itemID} not found on favorite item on user ${userID}`)
    }
})


module.exports = {
    getAllFavorite,
    getFavoriteByUserName,
    updateFavorite,
    getFavorite2,
    removeFavorite
}