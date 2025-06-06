const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please Add a name']
    },
    email:{
        type: String,
        required: [true, 'Please Add an Email'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Please Add a password']
    },
    isAdmin:{
     type: Boolean,
     required: true,
     default: false   
    }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('User', userSchema)