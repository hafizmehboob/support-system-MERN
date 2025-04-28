const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controller/userController') 
// to call middle ware just we need to add this as second arguments
const {protect} = require('../middleware/authMiddleWare')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)

module.exports = router 