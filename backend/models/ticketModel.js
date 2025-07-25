const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product:{
        type: String,
        required: [true, 'Please select a product'],
        enum: ['iPhone', 'Macbook Pro', 'iMac', 'iPad'],
    },
    description:{
        type: String,
        required: [true, 'Please enter description of the issue']
    },
    status:{
     type: String,
     enum: ['new', 'open', 'closed'],
     default: 'new',   
    }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Ticket', ticketSchema)