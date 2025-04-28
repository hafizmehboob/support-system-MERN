const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModels')

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get Token from header
            // we are splitting it with space because token is coming from Bearer Token
            token = req.headers.authorization.split(' ')[1] 
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            // Get user from token
            // -password will not get password from database
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }

    if(!token){
        res.status(401)
        throw new Error('Not Authorized')
    }
})

module.exports = { protect }