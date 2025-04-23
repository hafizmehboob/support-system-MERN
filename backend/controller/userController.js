const asyncHandler = require('express-async-handler') // for Auto error handling otherwise we need to write errors in trycatch
const bcrypt = require('bcryptjs') // for passwords encryption
const jwt = require('jsonwebtoken')
const User = require('../models/userModels') // imported the user table
// @desc Register a new user
// @route /api/users
// @access Public
const registerUser = asyncHandler(async(req, res) => {

    const {name, email, password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please include all the fields')
    }

    // Find if user already exist
    const userExist = await User.findOne({email})
    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    // create User
    const user = await User.create({
        name,
        email, 
        password: hashedPassword
    })
    // 201 indicates that something is created
    if(user){
        res.status(201, {
            _id: user._id, // this is how mongo DB create user ID
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }

})


// @desc Login a user
// @route /api/users/login
// @access public
    const loginUser = asyncHandler(async(req, res) => {

        const {email, password} = req.body

        const user = await User.findOne({email}) // finding user email into DB
        // check user and passwords match
        if(user && (await bcrypt.compare(password, user.password))){ // Matching the user password with DB password
            res.status(200, {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)

            })
        }else{
            res.status(401)
            throw new Error('Invalid Credentials')
        }

    })

// Generate Token
// id = user._id
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d' // expire days
    })
}

module.exports = {
    registerUser,
    loginUser,
}