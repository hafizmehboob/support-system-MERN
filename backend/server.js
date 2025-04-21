const express = require('express')
const dotenv = require('dotenv').config()

const PORT = process.env.PORT || 8000    


const app = express()

app.get('/', (req, res) => {
    // res.send('Gotcha')
    res.status(200).json({message: 'welcome to support API',
        body: 'Learn React JS'
    })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/users/login', require('./routes/userRoutes'))


app.listen(PORT, ()=> console.log(`Server started on the port ${PORT}`))