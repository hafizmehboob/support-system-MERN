const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000    

//connect to Database
connectDB()


const app = express()

// to allow JSON responce body in API postman
app.use(express.json())
// to allow url encoded body in API postman
app.use(express.urlencoded({ extended: false })) // will get data encoded like name=jhon but not like [name] = [jhon]

app.get('/', (req, res) => {
    // res.send('Gotcha') 
    res.status(200).json({message: 'welcome to support API',
        body: 'Learn React JS'
    })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))   
app.use('/api/users/login', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))   

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`Server started on the port ${PORT}`))
