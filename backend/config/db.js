const mongoose = require('mongoose')

const connectDB = async() => {
    try {
       const conn = await mongoose.connect(process.env.MONGO_URI);
       console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline); 
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold); // red.underline.bold is color library that we import from colors 
        process.exit(1) // exit the code
    }
}

module.exports = connectDB