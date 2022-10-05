const express = require('express')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const colors = require('colors')
const axios = require('axios')
const connectDB = require('./backend/config/db')
const auth = require('./backend/middleware/auth')

const multer = require('multer');

const jwt = require('jsonwebtoken')
const config = process.env

connectDB()

const { errorHandler } = require('./backend/middleware/errorMiddleware')

const port = 5000
const app = express()


var cors = require('cors');
const verifyToken = require('./backend/middleware/auth')
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }))


//app.use('/api/Users',verifyToken, require('./backend/routes/userRouters'))
app.use('/api/Users', require('./backend/routes/userRouters'))
app.use('/api/Items', require('./backend/routes/itemRouter'))
app.use('/api/FavoriteItem', require('./backend/routes/favoriteRouter'))
app.use('/api/login', require('./backend/routes/authRouter'))
app.use('/api/Order', require('./backend/routes/orderRouter'))
app.use('/api/Cart', require('./backend/routes/cartRouter'))
app.use('/api/payment', require('./backend/routes/stripeRouter'))
app.use('/api/discount', require('./backend/routes/discountRouter'))

app.post('/api/authen', (req, res) => {
    const authHeader = JSON.stringify(req.headers.authorization)
    console.log(req.headers)
    if (!authHeader) {
        res.status(403)
        throw new Error("A token is required for authentication")
    }
        const token = authHeader.substring(8, authHeader.length - 1);
        try {
            const decode = jwt.verify(token, config.TOKEN_KEY)
            req.user = decode
            res.status(200).json(decode)
        } catch (err) {
            console.log(err)
            res.status(401)
            throw new Error('invalid token')
        }

        
   

});




app.use(errorHandler)

app.listen(port, () => console.log('server startedon port', port))